#!/usr/bin/env python3
"""Vérifie hors réseau la structure du catalogue de projets du profil GitHub."""

from collections import Counter
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
README = ROOT / "README.md"
ROADMAP = ROOT / "QUALITY_ROADMAP.md"
CURATION = ROOT / "CURATION.md"
PROJECTS = ROOT / "PROJECTS.md"
SHOWCASE = ROOT / "SHOWCASE.md"
BANNER = ROOT / "assets" / "studio-niko-cover.svg"
HEADING = "## Projets retenus, classés par thème"
EXPECTED_COUNTS = [7, 3, 10, 3, 3, 4, 4, 4, 1]
SIGNATURE = ("Vision-IA", "galerie-studio-niko", "Nikoassist", "medicalvisionproai",
             "the-lovestronautes-machine", "handimonde")
REFERENCES = {
    "nikogroove": "EBM-BRETONNE.",
    "Medivision-ai-pro": "medicalvisionproai",
    "compagnon-diabete": "OPENVITA-DT1",
    "le-jardin-de-niko": "oracle-du-jardinier",
}

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
    if len(repo_names) != 39:
        errors.append(f"39 projets attendus ; {len(repo_names)} trouvés.")
    if not ROADMAP.is_file() or "(QUALITY_ROADMAP.md)" not in text:
        errors.append("Le plan qualité doit être présent et lié depuis README.md.")
    if not CURATION.is_file() or "(CURATION.md)" not in text:
        errors.append("La politique de sélection doit être présente et liée depuis README.md.")
    else:
        selection = CURATION.read_text(encoding="utf-8")
        for variant, reference in REFERENCES.items():
            if variant in repo_names:
                errors.append(f"Variante secondaire présente dans la vitrine : {variant}.")
            if reference not in repo_names:
                errors.append(f"Projet de référence absent du catalogue : {reference}.")
            if f"https://github.com/Nikoju1977/{variant}" not in selection:
                errors.append(f"Variante non documentée dans CURATION.md : {variant}.")
            if f"https://github.com/Nikoju1977/{reference}" not in selection:
                errors.append(f"Référence non documentée dans CURATION.md : {reference}.")
    if not PROJECTS.is_file() or "(PROJECTS.md)" not in text:
        errors.append("Les descriptions de chaque application doivent être accessibles depuis le profil.")
    else:
        details = PROJECTS.read_text(encoding="utf-8")
        detail_names = [match.group(2) for match in REPO_RE.finditer(details)]
        if len(detail_names) != 43 or len(set(detail_names)) != 43:
            errors.append(f"43 descriptions publiques uniques attendues ; {len(detail_names)} trouvées.")
        expected_details = set(repo_names) | set(REFERENCES)
        if set(detail_names) != expected_details:
            missing = sorted(expected_details - set(detail_names))
            surplus = sorted(set(detail_names) - expected_details)
            errors.append(f"Catalogue détaillé incohérent : absents={missing}, en trop={surplus}.")
        if not all(name in details for name in SIGNATURE):
            errors.append("Une ou plusieurs études de projets signature manquent dans PROJECTS.md.")
    if "White-hat" not in repo_names:
        errors.append("Le cockpit de cybersécurité manque au catalogue.")
    if "l-ultime-confrontation" in repo_names:
        errors.append("Le projet éditorial retiré ne doit pas être affiché.")

    # La vitrine GitHub doit être lisible en un coup d'œil, tout en restant accessible.
    if text.count("<details>") != len(EXPECTED_COUNTS):
        errors.append("Le catalogue doit offrir 9 rubriques repliables.")
    if text.count("</details>") != len(EXPECTED_COUNTS):
        errors.append("Une ou plusieurs rubriques du catalogue ne sont pas refermées.")
    if not BANNER.is_file() or 'src="assets/studio-niko-cover.svg"' not in text:
        errors.append("La signature graphique SVG doit être présente et référencée.")
    elif "<svg" not in BANNER.read_text(encoding="utf-8"):
        errors.append("La signature graphique ne contient pas de SVG.")
    studies = ""
    if not SHOWCASE.is_file() or "(SHOWCASE.md)" not in text:
        errors.append("Les études de projets doivent être présentes et liées.")
    else:
        studies = SHOWCASE.read_text(encoding="utf-8")
        for name in SIGNATURE:
            url = f"https://github.com/Nikoju1977/{name}"
            if name not in repo_names or url not in studies or url not in text:
                errors.append(f"Projet signature incohérent : {name}.")
        if studies.count("## 0") != len(SIGNATURE):
            errors.append("Six études de projets numérotées sont attendues.")
    if "l-ultime-confrontation" in text or "le-s-raphin-livre" in text:
        errors.append("Un projet retiré réapparaît sur le profil.")
    for demo_url in (
        "https://nikoju1977.github.io/Vision-IA/",
        "https://galerie-studio-niko-nikoju1977s-projects.vercel.app",
        "https://nikoju1977.github.io/the-lovestronautes-machine/",
        "https://nikoju1977.github.io/medicalvisionproai/",
    ):
        if demo_url not in text or demo_url not in studies:
            errors.append(f"Accès direct absent de la vitrine ou des études : {demo_url}.")



    if errors:
        for error in errors:
            print(f"ERREUR : {error}", file=sys.stderr)
        return 1
    print("OK : 9 thèmes repliables, 39 projets sélectionnés, 43 descriptions et 6 études.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
