"""MEDGUARD v3: deny-by-default evidence provenance gate (research use only).

No model-based truth or medical safety certification is claimed. A trusted document
must be present in a locally administered, reviewable provenance registry. A
matching SHA-256 only demonstrates bit-for-bit document integrity against that
registry, not that the clinical statements are medically correct.
"""
from __future__ import annotations

import hashlib
import json
import re
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit

from .engine import check, private_data_flags

DEFAULT_REGISTRY = Path(__file__).resolve().parent.parent / 'config' / 'approved_sources.json'
MAX_REGISTRY_BYTES = 1024 * 1024
MAX_ENTRIES = 500
INJECTION_PATTERNS = (
    r'ignore\s+(?:all\s+)?(?:previous|earlier|prior)\s+instructions',
    r'ignore[rz]?\s+(?:toutes?\s+)?(?:les\s+)?(?:instructions|consignes)\s+(?:precedentes|anterieures)',
    r'disregard\s+(?:all\s+)?(?:instructions|rules|system)',
    r'(?:revele|divulgue|show|print|expose)\s+(?:la\s+|le\s+|the\s+)?(?:cle|secret|api.key|system.prompt)',
    r'(?:disable|desactive|contourne|bypass)\s+(?:the\s+|le\s+|la\s+)?(?:safety|securite|guardrails|controle)',
    r'<\s*/?\s*(?:system|developer|assistant)\s*>',
    r'\[\s*(?:im_start|inst)\b',
)


def prompt_injection_indicators(text: str) -> list[str]:
    import unicodedata
    normalized = ''.join(c for c in unicodedata.normalize('NFKD', text.lower())
                         if not unicodedata.combining(c))
    return [f'INJECTION_PATTERN_{index + 1}' for index, pattern in enumerate(INJECTION_PATTERNS)
            if re.search(pattern, normalized, re.I)]


def _iso_date(value: Any) -> date | None:
    if not isinstance(value, str):
        return None
    try:
        parsed = date.fromisoformat(value)
        if parsed.isoformat() != value:
            return None
        return parsed
    except ValueError:
        return None


def _https_url(value: Any) -> bool:
    if not isinstance(value, str) or len(value) > 500:
        return False
    try:
        split = urlsplit(value)
        return (split.scheme == 'https' and bool(split.hostname)
                and not split.username and not split.password and not split.fragment)
    except ValueError:
        return False


def load_registry(path: str | Path = DEFAULT_REGISTRY) -> dict[str, dict[str, Any]]:
    p = Path(path)
    if not p.is_file() or p.stat().st_size > MAX_REGISTRY_BYTES:
        raise ValueError('Registre de références absent ou invalide.')
    obj = json.loads(p.read_text('utf-8'))
    if not isinstance(obj, dict) or obj.get('schema_version') != '1.0' or not isinstance(obj.get('sources'), list):
        raise ValueError('Format du registre invalide.')
    if len(obj['sources']) > MAX_ENTRIES:
        raise ValueError('Trop de références dans le registre.')
    registry = {}
    for s in obj['sources']:
        if not isinstance(s, dict) or not isinstance(s.get('id'), str) or not s['id'] or s['id'] in registry:
            raise ValueError('Identifiants de référence incorrects ou en doublon.')
        registry[s['id']] = s
    return registry


def verify_source(source: dict[str, Any], registry: dict[str, dict[str, Any]], today: date | None = None) -> tuple[bool, str, dict[str, Any] | None]:
    today = today or datetime.now(timezone.utc).date()
    entry = registry.get(str(source.get('id') or ''))
    if not entry:
        return False, 'REFERENCE_ABSENTE_DU_REGISTRE', None
    required = ('id', 'title', 'version', 'reviewer', 'source_url', 'sha256', 'reviewed_at', 'expires_at')
    if entry.get('approved') is not True or any(not isinstance(entry.get(key), str) or not entry[key] for key in required):
        return False, 'REFERENCE_NON_APPROUVEE_OU_INCOMPLETE', None
    reviewed, expires = _iso_date(entry['reviewed_at']), _iso_date(entry['expires_at'])
    if not reviewed or not expires or reviewed > today or expires < today or expires < reviewed:
        return False, 'REFERENCE_HORS_PERIODE_DE_VALIDITE', None
    if not _https_url(entry['source_url']):
        return False, 'URL_DE_PROVENANCE_INVALIDE', None
    raw = source.get('content')
    if not isinstance(raw, str) or not raw.strip():
        return False, 'CONTENU_VIDE', None
    checksum = hashlib.sha256(raw.encode('utf-8')).hexdigest()
    if not re.fullmatch('[a-f0-9]{64}', entry['sha256']) or checksum != entry['sha256']:
        return False, 'EMPREINTE_SHA256_DIFFERENTE', None
    if source.get('version') != entry['version']:
        return False, 'VERSION_DIFFERENTE', None
    if prompt_injection_indicators(raw):
        return False, 'INSTRUCTION_SUSPECTE_DANS_SOURCE', None
    if private_data_flags(raw):
        return False, 'IDENTIFIANT_PERSONNEL_POTENTIEL_DANS_SOURCE', None
    # Do not trust caller-provided declarations of review or identity.
    canonical = {k: entry[k] for k in ('id', 'title', 'version', 'reviewer', 'source_url')}
    canonical.update({'content': raw, 'reviewed': True})
    return True, 'EMPREINTE_ET_REGISTRE_CORRESPONDENT', canonical


def check_v3(answer: str, sources: list[dict[str, Any]], registry: dict[str, dict[str, Any]]) -> dict[str, Any]:
    if not isinstance(answer, str) or not isinstance(sources, list):
        raise ValueError('Entrée invalide.')
    seen: set[str] = set()
    accepted = []
    rejected = []
    for source in sources:
        if not isinstance(source, dict):
            raise ValueError('Chaque référence doit être un objet JSON.')
        source_id = str(source.get('id') or '')
        if source_id in seen:
            rejected.append({'id': source_id[:80], 'reason': 'REFERENCE_DUPLIQUEE'})
            continue
        seen.add(source_id)
        ok, reason, canonical = verify_source(source, registry)
        if ok:
            accepted.append(canonical)
        else:
            rejected.append({'id': source_id[:80], 'reason': reason})
    result = check(answer, accepted)
    indicators = prompt_injection_indicators(answer)
    if indicators:
        result['decision'] = 'BLOCKED'
        result['reason'] = 'Instructions suspectes détectées dans la sortie IA.'
    if rejected:
        result['decision'] = 'BLOCKED'
        result['reason'] = 'Une ou plusieurs sources ont échoué aux contrôles de provenance.'
    if not accepted:
        result['decision'] = 'BLOCKED'
        result['reason'] = 'Aucune référence autorisée dans le registre administré.'
    result['engine'] = 'medguard-provenance-v3'
    result['provenance'] = {
        'policy': 'DENY_BY_DEFAULT',
        'registry_version': '1.0',
        'accepted_source_count': len(accepted),
        'rejected_sources': rejected,
        'injection_indicators': indicators,
        'registry_is_independently_authenticated': False,
        'clinical_validity_checked': False,
        'source_reviewer_identity_cryptographically_verified': False,
    }
    result['limitations'] += ' Registre administré localement, non signé ; le hash ne vérifie ni la pertinence ni la qualité des données médicales.'
    return result
