"""MedGuard core: strict lexical evidence gate, NOT medical fact checking.

This engine intentionally refuses to infer entailment from fuzzy similarity.
Only identical normalized complete sentences from declared reviewed source documents
can pass the textual evidence check. Every fully evidenced output still requires
human clinical review before use.
"""
from __future__ import annotations

import hashlib
import re
import unicodedata
from datetime import datetime, timezone
from typing import Any

MAX_ANSWER_CHARS = 100_000
MAX_SOURCES = 30
MAX_SOURCE_CHARS = 300_000
MAX_CLAIMS = 300
MAX_CORPUS_SENTENCES = 4000
MIN_TOKENS = 4
MIN_CHARS = 22

RISK_TERMS = (
    "posologie", "dose", "dosage", "mg", "µg", "microgram", "insuline", "inject",
    "prescri", "traitement", "therap", "medicament", "antibiotique", "contre-indic",
    "diagnostic", "diagnosti", "symptome", "choc", "urgence", "convulsion", "hemorrag",
    "suicide", "automutil", "arret cardiaque", "douleur thoracique", "avc",
    "treatment", "medication", "diagnos", "prescription", "emergency", "insulin",
    "pregnan", "allerg", "renal", "hepatic", "renal", "kidney", "cardiac",
)
NEGATIONS = {"ne", "pas", "jamais", "aucun", "sans", "interdit", "not", "never", "no", "contraindique"}
STOPWORDS = {"le", "la", "les", "de", "du", "des", "un", "une", "et", "en", "est", "au", "aux", "que", "qui", "a", "il", "elle", "dans", "pour", "the", "and", "is", "of", "to", "on", "with"}


def normalize(text: str) -> str:
    """Case/accent/space normalization, preserving numeric punctuation and negations."""
    text = unicodedata.normalize("NFKD", text or "")
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = text.lower().replace("’", "'").replace("\u00a0", " ")
    text = re.sub(r"^\s*(?:[-*•]|\d+[.)])\s*", "", text)
    text = re.sub(r"[^\w\s.,/%+°µ'-]", " ", text, flags=re.UNICODE)
    text = re.sub(r"\s+", " ", text)
    return text.strip(" .,;:!?\"'")


def statements(text: str) -> list[str]:
    # Period split only after terminal punctuation + whitespace (never within decimals).
    lines = re.split(r"(?:\r?\n)+|(?<=[.!?])\s+(?=[\wÀ-ÿ\"“'(-])", text or "")
    out: list[str] = []
    for line in lines:
        claim = re.sub(r"^\s*(?:[-*•]|\d+[.)])\s*", "", line.strip()).strip()
        if claim:
            out.append(claim[:MAX_ANSWER_CHARS])
    return out


def terms(text: str) -> set[str]:
    return {w for w in re.findall(r"[\w]+(?:[.,][0-9]+)?", normalize(text)) if w not in STOPWORDS and len(w) > 1}


def numbers(text: str) -> list[str]:
    return re.findall(r"(?<!\w)\d+(?:[.,]\d+)?(?!\w)", normalize(text))


def private_data_flags(text: str) -> list[str]:
    flags: list[str] = []
    if re.search(r"\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b", text, flags=re.I):
        flags.append("Adresse électronique potentielle")
    if re.search(r"\b(?:[12]\s?\d{2}\s?(?:0[1-9]|1[0-2])\s?\d{2}\s?\d{3}\s?\d{3}\s?\d{2})\b", text):
        flags.append("Identifiant NIR potentiel")
    if re.search(r"\b(?:\+33\s?|0)[1-9](?:[ .-]?\d{2}){4}\b", text):
        flags.append("Numéro de téléphone potentiel")
    return flags


def severity(text: str) -> bool:
    norm = normalize(text)
    return any(term in norm for term in RISK_TERMS)


def candidate_match(claim: str, source_sentences: list[dict[str, Any]]) -> tuple[dict[str, Any] | None, float]:
    claim_tokens = terms(claim)
    if not claim_tokens:
        return None, 0.0
    best = None
    max_score = 0.0
    for candidate in source_sentences:
        ct = terms(candidate["text"])
        # A lexical similarity score is only used to suggest reading, never to clear a claim.
        if not ct:
            continue
        score = len(claim_tokens & ct) / len(claim_tokens | ct)
        if score > max_score:
            max_score, best = score, candidate
    return best, round(max_score, 3)



def potential_source_conflict(matched: dict[str, Any], corpus: list[dict[str, Any]]) -> dict[str, Any] | None:
    """Surface simple number/negation differences in competing source sentences.

    This only blocks and flags a *possible* conflict; it never asserts clinical
    contradiction or truth. Contradictions without lexical similarity are missed.
    """
    base_terms = terms(matched["text"])
    for other in corpus:
        if other is matched or other["normalized"] == matched["normalized"]:
            continue
        other_terms = terms(other["text"])
        union = base_terms | other_terms
        score = len(base_terms & other_terms) / len(union) if union else 0.0
        if score >= 0.58 and (
            numbers(matched["text"]) != numbers(other["text"]) or
            bool(base_terms & NEGATIONS) != bool(other_terms & NEGATIONS)
        ):
            return {"source_id": other["source_id"], "source_title": other["source_title"],
                    "text": other["text"], "source_sha256": other["source_sha256"]}
    return None


def check(answer: str, sources: list[dict[str, Any]]) -> dict[str, Any]:
    if not isinstance(answer, str):
        raise ValueError("'answer' doit être une chaîne.")
    if not isinstance(sources, list):
        raise ValueError("'sources' doit être une liste.")
    if len(answer) > MAX_ANSWER_CHARS:
        raise ValueError(f"Réponse trop longue : maximum {MAX_ANSWER_CHARS} caractères.")
    if len(sources) > MAX_SOURCES:
        raise ValueError(f"Trop de sources : maximum {MAX_SOURCES}.")

    accepted: list[dict[str, Any]] = []
    excluded: list[dict[str, Any]] = []
    all_corpus: list[dict[str, Any]] = []
    source_private_data = False
    for i, source in enumerate(sources):
        if not isinstance(source, dict):
            raise ValueError("Chaque source doit être un objet JSON.")
        content = str(source.get("content") or "")
        if len(content) > MAX_SOURCE_CHARS:
            raise ValueError(f"Source {i + 1} trop longue : maximum {MAX_SOURCE_CHARS} caractères.")
        title = str(source.get("title") or "").strip()
        version = str(source.get("version") or "").strip()
        reviewer = str(source.get("reviewer") or "").strip()
        reviewed = source.get("reviewed") is True
        meta = {
            "id": str(source.get("id") or f"doc-{i + 1}")[:80],
            "title": title[:200],
            "version": version[:80],
            "reviewer": reviewer[:120],
            "reviewed": reviewed,
            "sha256": hashlib.sha256(content.encode("utf-8")).hexdigest(),
            "source_url": str(source.get("source_url") or "")[:500],
        }
        # The flag is a user declaration, not verified professional authentication.
        if not (title and version and reviewer and reviewed and content.strip()):
            excluded.append({**meta, "reason": "Métadonnées/texte incomplets ou source non revue (déclaration)."})
            continue
        accepted.append(meta)
        source_private_data = source_private_data or bool(private_data_flags(content))
        for chunk in statements(content):
            all_corpus.append({"source_id": meta["id"], "source_title": meta["title"], "text": chunk,
                               "normalized": normalize(chunk), "source_sha256": meta["sha256"]})
            if len(all_corpus) > MAX_CORPUS_SENTENCES:
                raise ValueError(f"Corpus trop grand : maximum {MAX_CORPUS_SENTENCES} phrases.")

    split_answer = statements(answer)
    if len(split_answer) > MAX_CLAIMS:
        raise ValueError(f"Réponse trop longue : maximum {MAX_CLAIMS} phrases.")
    claims: list[dict[str, Any]] = []
    for i, sentence in enumerate(split_answer):
        norm = normalize(sentence)
        enough = len(norm) >= MIN_CHARS and len(norm.split()) >= MIN_TOKENS
        matched = next((c for c in all_corpus if c["normalized"] == norm), None) if enough else None
        risky = severity(sentence)
        if matched:
            alternate_conflict = potential_source_conflict(matched, all_corpus)
            status = "SOURCE_DISAGREEMENT" if alternate_conflict else "TEXT_MATCH"
            # Deliberately NOT 'medically verified'.
            evidence = {k: matched[k] for k in ("source_id", "source_title", "text", "source_sha256")}
            similarity = 1.0
        else:
            closest, similarity = candidate_match(sentence, all_corpus)
            discrepancy = bool(closest and similarity >= 0.48 and (
                numbers(sentence) != numbers(closest["text"]) or
                (bool(terms(sentence) & NEGATIONS) != bool(terms(closest["text"]) & NEGATIONS))
            ))
            status = "POSSIBLE_CONFLICT" if discrepancy else "UNSUPPORTED"
            evidence = ({"source_id": closest["source_id"], "source_title": closest["source_title"],
                         "text": closest["text"], "source_sha256": closest["source_sha256"]}
                        if closest and similarity >= 0.28 else None)
        claims.append({"index": i + 1, "claim": sentence, "status": status,
                       "risk_flag": risky, "evidence": evidence,
                       "conflicting_source": alternate_conflict if matched else None,
                       "similarity_for_review_only": similarity})

    flags = private_data_flags(answer)
    if source_private_data:
        flags.append("Données personnelles potentielles dans le corpus documentaire")
    if not claims:
        decision = "BLOCKED"
        reason = "Aucune affirmation à analyser."
    elif flags:
        decision = "BLOCKED"
        reason = "Identifiants personnels potentiels détectés : supprimer les données personnelles."
    elif any(c["status"] != "TEXT_MATCH" for c in claims):
        decision = "BLOCKED"
        reason = "Au moins une affirmation ne correspond pas textuellement à une source déclarée revue."
    else:
        decision = "HUMAN_REVIEW"
        reason = "Correspondances textuelles uniquement : validation clinique humaine obligatoire."
    return {
        "engine": "medguard-strict-v1", "decision": decision, "reason": reason,
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "limitations": "Correspondance littérale seulement ; ni authenticité des sources, ni véracité médicale, ni complétude, ni contradictions complexes ne sont garanties.",
        "summary": {
            "total": len(claims), "text_matches": sum(c["status"] == "TEXT_MATCH" for c in claims),
            "unverified": sum(c["status"] != "TEXT_MATCH" for c in claims),
            "risk_flags": sum(c["risk_flag"] for c in claims),
            "accepted_sources": len(accepted), "excluded_sources": len(excluded),
        },
        "privacy_flags": flags, "claims": claims, "accepted_sources": accepted,
        "excluded_sources": excluded,
    }
