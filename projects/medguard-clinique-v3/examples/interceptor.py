"""Exemple d'intégration : ne publie JAMAIS une réponse automatiquement.

Usage fictif, hors données patient et hors environnement de soin.
"""
import json
import os
from urllib.error import URLError, HTTPError
from urllib.request import Request, urlopen


def medical_ai_gateway(answer: str, sources: list[dict]) -> dict:
    payload = json.dumps({"answer": answer, "sources": sources}).encode()
    key = os.environ.get('MEDGUARD_API_KEY', '')
    if len(key) < 32:
        return {'publish': False, 'state': 'BLOCKED', 'error': 'API key missing'}
    request = Request("http://127.0.0.1:8000/api/v3/check", data=payload,
                      headers={"Content-Type": "application/json", "X-API-Key": key}, method="POST")
    try:
        with urlopen(request, timeout=5) as response:
            result = json.load(response)
        if result.get("decision") == "HUMAN_REVIEW":
            return {"publish": False, "state": "AWAITING_CLINICIAN", "decision": result.get("decision")}
        return {"publish": False, "state": "BLOCKED", "decision": result.get("decision")}
    except (URLError, HTTPError, TimeoutError, ValueError) as exc:
        # Failure is NOT permission to skip verification.
        return {"publish": False, "state": "BLOCKED", "error": "MEDGUARD unavailable"}
