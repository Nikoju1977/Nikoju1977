"""MEDGUARD CLINIQUE v2: local-only prototype API with mandatory bearer secret.

This is security hardening for an evaluation prototype, not a certified medical product
or a production-grade security perimeter. No patient data should be submitted.
"""
from __future__ import annotations

import hmac
import os
from pathlib import Path

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from pydantic import BaseModel, ConfigDict, Field

from .engine import check
from .assurance import check_v3, load_registry, DEFAULT_REGISTRY

ROOT = Path(__file__).resolve().parent.parent
MAX_BODY_BYTES = 12 * 1024 * 1024  # 30 x 300k UTF-8 characters plus JSON framing

app = FastAPI(title="MEDGUARD CLINIQUE · Research Gateway", version="3.0.0",
              docs_url=None, redoc_url=None, openapi_url=None,
              description="Prototype de comparaison de textes, sans validation clinique.")
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1", "testserver", "[::1]"])


@app.middleware("http")
async def privacy_headers(request: Request, call_next):
    # Reject cross-site browser posts even when a custom client could set an Origin.
    origin = request.headers.get("origin")
    if origin and origin not in {"http://localhost:8000", "http://127.0.0.1:8000"}:
        return _secure_headers(JSONResponse({"detail": "Origine non autorisée."}, status_code=403))
    if request.url.path.startswith("/api/") and request.method == "POST":
        if not request.headers.get("content-type", "").lower().startswith("application/json"):
            return _secure_headers(JSONResponse({"detail": "Content-Type application/json requis."}, status_code=415))
        declared = request.headers.get("content-length")
        if declared is None:
            return _secure_headers(JSONResponse({"detail": "Content-Length requis."}, status_code=411))
        if not declared.isdigit() or int(declared) > MAX_BODY_BYTES:
            return _secure_headers(JSONResponse({"detail": "Requête trop volumineuse."}, status_code=413))
        # Reject unauthenticated calls before Pydantic parses potentially sensitive bodies.
        expected = os.environ.get("MEDGUARD_API_KEY", "")
        if len(expected) < 32:
            return _secure_headers(JSONResponse({"detail": "API désactivée : secret serveur manquant ou trop court."}, status_code=503))
        supplied = request.headers.get("x-api-key", "")
        if not hmac.compare_digest(supplied, expected):
            return _secure_headers(JSONResponse({"detail": "Authentification requise."}, status_code=401,
                                                headers={"WWW-Authenticate": "ApiKey"}))
    response = await call_next(request)
    return _secure_headers(response)


def _secure_headers(response):
    response.headers["Cache-Control"] = "no-store, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; script-src 'self'; style-src 'self'; "
        "img-src 'self' data:; connect-src 'none'; form-action 'none'; "
        "object-src 'none'; frame-ancestors 'none'; base-uri 'none'"
    )
    return response


class Document(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str | None = Field(default=None, max_length=80)
    title: str = Field(max_length=200)
    version: str = Field(max_length=80)
    reviewer: str = Field(max_length=120)
    reviewed: bool = False
    source_url: str | None = Field(default=None, max_length=500)
    content: str = Field(max_length=300_000)


class CheckRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    answer: str = Field(max_length=100_000)
    sources: list[Document] = Field(default_factory=list, max_length=30)


def require_key(x_api_key: str | None):
    expected = os.environ.get("MEDGUARD_API_KEY", "")
    if len(expected) < 32:
        raise HTTPException(status_code=503, detail="API désactivée : secret serveur manquant ou trop court.")
    if x_api_key is None or not hmac.compare_digest(x_api_key, expected):
        raise HTTPException(status_code=401, detail="Authentification requise.", headers={"WWW-Authenticate": "ApiKey"})


@app.get("/health")
def health():
    return {"ok": True, "engine": "medguard-provenance-v3", "version": "3.0.0",
            "medical_validation": False, "regulatory_certification": False,
            "api_enabled": len(os.environ.get("MEDGUARD_API_KEY", "")) >= 32}


@app.post("/api/v3/check")
def check_answer_provenance(payload: CheckRequest, x_api_key: str | None = Header(default=None)):
    require_key(x_api_key)
    try:
        registry_file = os.environ.get("MEDGUARD_TRUST_REGISTRY", "").strip() or DEFAULT_REGISTRY
        registry = load_registry(registry_file)
        return check_v3(payload.answer, [s.model_dump() for s in payload.sources], registry)
    except (ValueError, OSError) as exc:
        # Never fall back to the permissive research endpoint when the registry fails.
        raise HTTPException(status_code=503, detail="Registre de provenance indisponible ou invalide.") from exc


@app.post("/api/v2/check")
@app.post("/api/v1/check")  # Backward-compatible route with stricter security.
def check_answer(payload: CheckRequest, x_api_key: str | None = Header(default=None)):
    require_key(x_api_key)
    try:
        return check(payload.answer, [s.model_dump() for s in payload.sources])
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.get("/")
def home():
    return FileResponse(ROOT / "web" / "index.html")


app.mount("/", StaticFiles(directory=ROOT / "web"), name="web")
