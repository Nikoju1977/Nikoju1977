#!/usr/bin/env python3
"""Vérifie hors réseau la structure du catalogue de projets du profil GitHub."""

from collections import Counter
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
README = ROOT / "README.md"
ROADMAP = ROOT / "QUALITY_ROADMAP.md"
HEADING = "## Projets retenus, classés par thème"
EXPECTED_COUNTS = [7, 3, 9, 3, 3, 7, 5, 4, 1]

SECTION_RE = re.compile(r"^### (\d+)\. (.+)$", re.MULTILINE)
REPO_RE = re.compile(
    r"^\|\s*\[([^\]]+)\]\(https://github\.com/Nikoju1977/([^)]+)\)\s*\|",
    re.MULTILINE,
)


def main() -> int:
    errors = []
    if not README.exists():
        print("ERREUR : README.md absent.")
        return 1
    text = README.read_text(encoding="utf-8")
    if HEADING not in text:
        print("ERREUR : section catalogue absente.")
        return 1

    catalog = text.split(HEADING, 1)[1].split("\n---\n", 1)[0]
    sections = list(SECTION_RE.finditer(catalog))
    if len(sections) != len(EXPECTED_COUNTS):
        errors.append(f"9 catégories attendues ; {len(sections)} trouvées.")

    repo_names = []
    for index, section in enumerate(sections):
        start = section.end()
        end = sections[index + 1].start() if index + 1 < len(sections) else len(catalog)
        rows = list(REPO_RE.finditer(catalog[start:end]))
        expected = EXPECTED_COUNTS[index] if index < len(EXPECTED_COUNTS) else None
        if section.group(1) != str(index + 1):
            errors.append(f"Numérotation incorrecte : {section.group(0)}")
        if expected is not None and len(rows) != expected:
            errors.append(f"{section.group(2)} : {len(rows)} projets, attendu {expected}.")
        for row in rows:
            label, name = row.group(1), row.group(2)
            if label != name:
                errors.append(f"Libellé et URL incohérents : {label!r} / {name!r}.")
            repo_names.append(name)

    duplicates = [name for name, count in Counter(repo_names).items() if count > 1]
    if duplicates:
        errors.append("Dépôts en double : " + ", ".join(sorted(duplicates)))
    if len(repo_names) != 42:
        errors.append(f"42 projets attendus ; {len(repo_names)} trouvés.")
    if not ROADMAP.is_file() or "(QUALITY_ROADMAP.md)" not in text:
        errors.append("Le plan qualité doit être présent et lié depuis README.md.")

    if errors:
        for error in errors:
            print(f"ERREUR : {error}", file=sys.stderr)
        return 1
    print("OK : 9 thèmes, 42 projets sélectionnés et plan qualité référencé.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
