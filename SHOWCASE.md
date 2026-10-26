# Studio Niko Design — projets signature

[← Retour au profil](README.md) · [Explorer les 9 domaines](README.md#projets-retenus-classés-par-thème) · [Critères de sélection](CURATION.md)

**Approche :** montrer un problème concret, les choix d'implémentation et les limites. Les détails ci-dessous sont fondés sur la documentation et la structure déclarées des dépôts, **pas sur un audit indépendant de production**.

## 01 — Vision-IA · Construire un film sans confondre faits et propositions

**Domaine :** cinéma, workflow éditorial, IA documentaire.  
**Projet :** [Vision-IA](https://github.com/Nikoju1977/Vision-IA)

**Problème.** La préparation d'un film mobilise plusieurs livrables — note d'intention, découpage, conducteur, parti pris d'image et dossier de production. Lorsqu'un modèle intervient, les inventions de mise en scène ne doivent pas être prises pour des faits issus du scénario.

**Réponse technique documentée.** Le classeur importe plusieurs formats de texte ; le découpage est rattaché à une séquence source avec un identifiant persistant. Les informations documentées, déductions, propositions et points à vérifier sont distingués. Le conducteur est calculé localement et les projets sont exportables.

**À examiner dans le code.** Gestion des sources, reprise du dépouillement, sauvegarde IndexedDB, traitement des limites API et export du dossier.

**Limites.** Les fournisseurs IA exigent une configuration et peuvent se tromper. L'utilisation sur des documents sensibles nécessite une vérification des flux de données.

## 02 — Galerie Studio Niko · Une exposition 3D, pas seulement une page portfolio

**Domaine :** Web 3D, art numérique, publication.  
**Projet :** [galerie-studio-niko](https://github.com/Nikoju1977/galerie-studio-niko) · [Adresse de démonstration annoncée](https://galerie-studio-niko-nikoju1977s-projects.vercel.app)

**Problème.** Exposer en ligne des œuvres de nature différente — image, film, sculpture et son — avec une scénographie lisible.

**Réponse technique documentée.** Salle 3D et accrochage, cartels, éclairage, mode exposition, neuf langues et parcours de publication. Une source ESM alimente une construction versionnée avec des vérifications structurelles et des tests de régression spécifiques.

**À examiner dans le code.** `src/galerie.html`, `tools/build.sh`, `tools/verify.mjs`, `supabase/schema.sql`.

**Limites.** Les médias volumineux ne font pas tous partie de la publication distante ; les accès d'édition reposent sur le serveur et son contrôle d'autorisation.

## 03 — NikoAssist · Orchestrer des agents sans leur donner carte blanche

**Domaine :** agents IA, Python, mobile, architecture défensive.  
**Projet :** [Nikoassist](https://github.com/Nikoju1977/Nikoassist)

**Problème.** Déléguer une tâche à plusieurs agents accroît les risques d'actions excessives, de dépenses et de reprises involontaires.

**Réponse technique documentée.** Orchestration jusqu'à quatre rôles, budgets d'exécution, vérification des outils sensibles, autorisations Sentinel et installation réversible avec `--dry-run`.

**À examiner dans le code.** `scripts/install_nikoassist.py`, `tests/`, `docs/INSTALLATION.md` et workflows de compilation.

**Limites.** Ce travail adapte le logiciel libre nanoMuse et conserve ses attributions GPL. La présence d'un workflow Android/iOS ne démontre pas la disponibilité d'une application mobile installable et validée.

## 04 — MedVision AI Pro · Explorer l'imagerie sans prétendre diagnostiquer

**Domaine :** visualisation d'imagerie, traitement local, confidentialité.  
**Projet :** [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai) · [Adresse de démonstration annoncée](https://nikoju1977.github.io/medicalvisionproai/)

**Problème.** Consulter et comparer des images, annoter des régions et expérimenter une assistance visuelle tout en expliquant précisément le traitement des données.

**Réponse technique documentée.** Import JPEG/PNG et séries DICOM monochromes non compressées, reconstruction multi-planaire, réglages Window/Level, dossiers locaux chiffrés, export et tests sur données synthétiques.

**À examiner dans le code.** `imaging-pro.js`, `test/`, `VALIDATION.md`, `package.json`.

**Limites critiques.** **Prototype non certifié.** Une analyse IA distante transmet les images au fournisseur configuré. Ni performance diagnostique ni aptitude à une décision médicale ne sont revendiquées.

## 05 — Thelovestronautes Machine · Faire du navigateur un instrument

**Domaine :** musique, Web Audio, interaction en temps réel.  
**Projet :** [the-lovestronautes-machine](https://github.com/Nikoju1977/the-lovestronautes-machine) · [Adresse de démonstration annoncée](https://nikoju1977.github.io/the-lovestronautes-machine/)

**Problème.** Composer et jouer une groovebox sans environnement de production audio séparé.

**Réponse technique documentée.** Séquenceur pas à pas, synthèse Web Audio, swing, morphing, automation, piste de biniou électronique, contrôles MIDI, export JSON et enregistrement selon le navigateur.

**À examiner dans le code.** `index.html` et `scripts/validate.mjs`.

**Limites.** MIDI, sortie audio, export et PWA dépendent des permissions et de la compatibilité du navigateur ; le contrôle statique ne remplace pas un essai musical réel.

## 06 — HandiMonde · Une carte utile exige des limites explicites

**Domaine :** service public pratique, cartographie, accessibilité.  
**Projet :** [handimonde](https://github.com/Nikoju1977/handimonde)

**Problème.** Retrouver des informations de terrain sur l'accessibilité des lieux et équipements, sans confondre disponibilité des données et garantie d'accessibilité.

**Réponse technique documentée.** Carte Leaflet utilisant OpenStreetMap, interfaces de recherche, fonctions serveur `api/` et configuration Vercel.

**À examiner dans le code.** `index.html`, `app.html`, `api/`, `vercel.json`.

**Limites.** Les données participatives peuvent être incomplètes ou obsolètes. Aucune conformité WCAG/RGAA n'est attestée.

---

## Accès rapides, preuves et limites

Les six projets ont des finalités différentes. Les liens ci-dessous permettent d'inspecter le **code ou les contrôles réellement présents dans les dépôts** ; leur existence n'implique ni test réussi sur tous les appareils ni qualité de production.

| Projet | Accès direct | Preuve à consulter dans le dépôt | Vérification restant à faire |
| :--- | :--- | :--- | :--- |
| **Vision-IA** | [Atelier web](https://nikoju1977.github.io/Vision-IA/) | [Outils](https://github.com/Nikoju1977/Vision-IA/tree/main/tools) et [politique de sécurité](https://github.com/Nikoju1977/Vision-IA/blob/main/SECURITY.md) | Import/export et flux vers les fournisseurs IA sur navigateur réel |
| **Galerie 3D** | [Visiter la galerie](https://galerie-studio-niko-nikoju1977s-projects.vercel.app) | [Vérification du build](https://github.com/Nikoju1977/galerie-studio-niko/blob/main/tools/verify.mjs) | Publication distante, performances et expérience mobile |
| **NikoAssist** | [Documentation](https://github.com/Nikoju1977/Nikoassist) | [Suite de tests](https://github.com/Nikoju1977/Nikoassist/tree/main/tests) et [guide d'installation](https://github.com/Nikoju1977/Nikoassist/blob/main/docs/INSTALLATION.md) | Builds signés et usage réel sur iOS/Android |
| **MedVision AI Pro** | [Visualisation web](https://nikoju1977.github.io/medicalvisionproai/) | [Validation documentée](https://github.com/Nikoju1977/medicalvisionproai/blob/main/VALIDATION.md) et [tests](https://github.com/Nikoju1977/medicalvisionproai/tree/main/test) | Compatibilité DICOM réelle, vie privée et absence de validation clinique |
| **Thelovestronautes Machine** | [Jouer dans le navigateur](https://nikoju1977.github.io/the-lovestronautes-machine/) | [Validateur statique](https://github.com/Nikoju1977/the-lovestronautes-machine/blob/main/scripts/validate.mjs) | Test de sortie audio, MIDI, export et installation PWA |
| **HandiMonde** | [Code et documentation](https://github.com/Nikoju1977/handimonde) | [Page de test](https://github.com/Nikoju1977/handimonde/blob/main/test.html) | Exactitude et fraîcheur des données, revue d'accessibilité |

**Lecture juste :** « présence d'un test » n'est pas « test passé », et « démo annoncée » n'est pas « disponibilité confirmée ». Les liens de démonstration ne doivent pas être utilisés comme preuve de fonctionnement sans essai.

## Principes transversaux

**Créer avec une intention.** Le récit, l'usage et le public doivent dicter les interactions plutôt que l'inverse.

**Tracer les faits.** Une démonstration, un test et une validation en conditions réelles sont trois états différents ; cette distinction est documentée.

**Préserver la confiance.** Privilégier les garde-fous, les autorisations explicites, les crédits open source et la prudence dans les usages de santé.

**Rendre le travail exploratoire.** Les liens renvoient à des dépôts consultables. Les adresses de démonstration proviennent des README de projets et leur disponibilité n'a pas été confirmée lors de cette mise à jour.

[Retour à la vitrine](README.md) · [Voir la feuille de route de fiabilité](QUALITY_ROADMAP.md)
