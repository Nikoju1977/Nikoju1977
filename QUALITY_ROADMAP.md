# Plan qualité du portfolio — Studio Niko Design

**Date de référence : 26 octobre 2026**  
**Compte :** [Nikoju1977](https://github.com/Nikoju1977)

## Périmètre vérifié

- **50 dépôts** accessibles en propriété lors de la dernière lecture : **46 publics** (profil inclus), **4 privés**. Deux dépôts publics précédemment inventoriés ne sont plus accessibles sur le compte ; les liens obsolètes ont été retirés de la vitrine.
- Le [README du profil](README.md) met désormais en avant **39 projets publics sélectionnés** parmi les **45 projets publics** (hors dépôt de profil), dans 9 domaines. Les **5 variantes secondaires** et **1 projet non retenu éditorialement** ne figurent plus dans la vitrine. La sélection est documentée dans [CURATION.md](CURATION.md).
- Une lecture des fichiers racine et des README a été réalisée pour les projets publics ; l'examen des dépôts privés a été limité à leurs README ou points d'entrée pertinents.
- Les deux projets musicaux qui n'avaient pas de README en ont désormais un. Les dépôts privés ont été examinés séparément, sans diffusion de leur inventaire.
- **Les 50 dépôts actuellement visibles disposent d'un fichier README** (y compris `readme.md` en minuscules pour `radar-de-niko`).

**Limite de cette revue :** la présence d'un fichier, d'un workflow ou d'un texte documentaire ne prouve ni réussite de build, ni couverture de tests, ni conformité RGAA/WCAG, ni sécurité effective. Aucune exécution globale des applications ou analyse approfondie de leurs dépendances n'est attestée.

## Travaux documentaires réalisés

- Profil public restructuré par thème, avec vitrines sélectionnées et avertissement sur la maturité des projets.
- README créés dans les dépôts publics : `EBM-BRETONNE.`, `nikogroove`.
- README clarifiés : `handimonde`, `presentation-medtronic`, `Medivision-ai-pro`, `agent-biometrique`, `compagnon-diabete`, `daphnee-compagnon`, `applewatchcadrans`, `aylina-is-cooking`, `ia-studio-cine`, `fibrobot`, `SCAN-BIOMEDICAL`, `haomassage-sandra`, `miaotris`, `les-annales-akashiques`, `oracle-du-jardinier`, `purescanai`, `Neural-Art-mars-2026`.
- Les dépôts privés ont reçu une revue documentaire séparée. Leurs noms et détails de contenu ne sont pas exposés dans ce bilan public.

## Compléments documentaires et sécurité — 26 octobre 2026

- Quatre README supplémentaires clarifiés : `Metrology-OS`, `Dbmetre-pro`, `patisserie`, `le-jardin-de-niko` (dont correction d'un lien de démonstration non vérifié).
- **25 politiques `SECURITY.md` ajoutées** à des projets sensibles ou exploitant des APIs externes : 17 sur les applications de santé, assistants, données utilisateur et multimédia ; 8 autres sur les projets de géolocalisation, cinéma, galerie, journal personnel, veille et jeu jeune public.
- Les politiques expliquent comment signaler une faille sans divulguer de secret. **Elles ne constituent pas une vérification des vulnérabilités ni la preuve que le signalement privé GitHub est activé.**
- Aucune clé, visibilité de dépôt ou licence n'a été modifiée par cette campagne documentaire.
- **Vérification automatisée du catalogue du profil** : `scripts/check_portfolio.py` contrôle hors réseau les 9 rubriques, les 39 liens des projets sélectionnés sans doublon et la présence du plan qualité ; `.github/workflows/portfolio-check.yml` déclenche ce contrôle sur modifications du profil. Il ne vérifie pas la disponibilité des démonstrations ni le bon fonctionnement des applications.

## Sélection des versions de référence — 26 octobre 2026

Le profil privilégie désormais **une seule application représentative par famille fonctionnelle**. Cinq prototypes proches et un projet éditorial hors sélection ont été retirés du catalogue principal, sans suppression de code ni de dépôt. Les critères sont documentés dans [CURATION.md](CURATION.md). Cette sélection repose sur les fichiers et la documentation consultables : **elle ne prouve pas la qualité en production**, faute de tests fonctionnels comparatifs sur appareils réels.

Le nouveau projet public `White-hat` a été ajouté au catalogue dans la catégorie des outils métier et de sécurité. Sa présence ne vaut pas validation de ses fonctions d'audit.

## Contrôle automatique des applications HTML — 26 octobre 2026

- **20 dépôts web statiques** dépourvus de ce contrôle ont reçu le workflow `.github/workflows/static-html.yml`. Il vérifie sous GitHub Actions le point d'entrée `index.html` (DOCTYPE HTML5, balise `html`, titre et marqueurs évidents de conflit Git), sans dépendances logicielles ni secrets.
- **20 exécutions sur 20 ont été observées comme terminées avec succès** dans GitHub Actions lors du contrôle du 26 octobre 2026, notamment pour les applications de suivi, de musique/arts, de jardin, d'industrie et les démonstrations web concernées. Le [journal des Actions du compte](https://github.com/Nikoju1977?tab=repositories) permet de retrouver chaque projet ; exemple : [contrôle sur FibroCare](https://github.com/Nikoju1977/fibrocare/actions/runs/40355227644).
- **Portée stricte :** un test de structure HTML **n'atteste pas** du démarrage correct de JavaScript, du bon fonctionnement d'une API, de l'accessibilité, du contenu, de la protection des données, d'une installation PWA ni de la sécurité. Les dépôts dotés d'autres workflows n'ont pas été normalisés de force.

## Portfolio signature — identité et récit produit

Le profil GitHub affiche une signature graphique originale (`assets/studio-niko-cover.svg`), **six projets signature** documentés dans [SHOWCASE.md](SHOWCASE.md) et un accès repliable aux **39 projets retenus** dans neuf domaines. Le contrôle `scripts/check_portfolio.py` vérifie désormais aussi l'existence de l'identité graphique, des études de projet, des références et des rubriques repliables.

**La sélection est éditoriale.** Aucune disponibilité des démonstrations, certification ou compatibilité d'exécution n'est déduite de la présentation visuelle. Les projets tiers sont crédités selon leurs licences.

## Descriptions de chaque dépôt public — 26 octobre 2026

Le guide [PROJECTS.md](PROJECTS.md) décrit individuellement la vocation et les limites de **44 dépôts publics**, soit **39 projets de référence** et **5 variantes documentées à part**. Le projet exclu de la vitrine à la demande du propriétaire et les quatre dépôts privés ne sont pas répertoriés dans ce document public.

Le profil conserve neuf rubriques, et son script de vérification contrôle désormais la correspondance entre les **39 entrées du profil** et les **44 descriptions du guide**. La revue vérifie la cohérence documentaire, pas le fonctionnement applicatif ni la disponibilité des démos. Deux liens vers des dépôts qui ne sont plus accessibles ont été retirés du profil.

## Priorités techniques avant de qualifier un projet « prêt pour la production »

### Priorité 0 — Données sensibles et usages médicaux

| Dépôts | Vérification nécessaire |
| --- | --- |
| [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai), [Medivision-ai-pro](https://github.com/Nikoju1977/Medivision-ai-pro) | Distinguer le prototype d'imagerie opérationnel du simple starter PWA ; revoir formats, sécurité et exactitude des revendications |
| [OPENVITA-DT1](https://github.com/Nikoju1977/OPENVITA-DT1), [jarvisdiabete](https://github.com/Nikoju1977/jarvisdiabete), [compagnon-diabete](https://github.com/Nikoju1977/compagnon-diabete) | Séparer démonstration et décision de traitement ; revue clinique et protection des données avant tout usage réel |
| [dermato-ai](https://github.com/Nikoju1977/dermato-ai), [SCAN-BIOMEDICAL](https://github.com/Nikoju1977/SCAN-BIOMEDICAL), [agent-biometrique](https://github.com/Nikoju1977/agent-biometrique), [fibrobot](https://github.com/Nikoju1977/fibrobot), [fibrocare](https://github.com/Nikoju1977/fibrocare) | Revue des limites de modèles, des données médicales importées et de la terminologie clinique |
| [purescanai](https://github.com/Nikoju1977/purescanai) | Vérifier les sources utilisées pour les scores liés aux ingrédients et éviter les conclusions toxicologiques non étayées |

### Priorité 1 — Services connectés, identité et secrets

| Dépôts | Vérification nécessaire |
| --- | --- |
| [job-search](https://github.com/Nikoju1977/job-search) | Tests d'authentification, sessions, chiffrement des CV, autorisations des tâches automatisées |
| [Boutique-morgane](https://github.com/Nikoju1977/Boutique-morgane) | Validation des entrées, protection des accès administrateur, gestion des variables serveur |
| [handimonde](https://github.com/Nikoju1977/handimonde) | Fiabilité des données OSM, qualité de l'accessibilité, contraintes sur les API et consentement géolocalisation |
| [galerie-studio-niko](https://github.com/Nikoju1977/galerie-studio-niko) | Vérification des droits d'écriture, des médias publiables et des tests de la chaîne de construction |
| [Nikoassist](https://github.com/Nikoju1977/Nikoassist), [Ron-](https://github.com/Nikoju1977/Ron-), [Sage-companion](https://github.com/Nikoju1977/Sage-companion) | Permissions explicites des agents, confinement des outils, budgets, revues des dépendances et de la collecte des données |

### Priorité 2 — Ergonomie, reproductibilité et maintenance

- **Cinéma, arts et audio :** automatiser des tests de démarrage, de chargement d'assets, de liens et d'export pour les projets concernés.
- **Applications PWA :** vérifier installation, manifestes, service workers, modes hors ligne et renouvellement du cache.
- **Jeux :** tester clavier, tactile, mode réduit, sauvegarde locale, performances et comportement mobile.
- **Outils industriels :** tester les calculs de métrologie et garder des traces reproductibles des scénarios de validation.
- **Projet tiers [Wan2GP](https://github.com/Nikoju1977/Wan2GP) :** conserver attribution, licences et historique de l'amont ; éviter d'attribuer le code amont à Studio Niko Design.

## Normes minimales souhaitées pour chaque dépôt

- [x] Un README de présentation à la racine
- [ ] Description courte et **topics GitHub** cohérents avec le catalogue
- [ ] Installation/démarrage reproductible sur une machine vierge
- [ ] Liste des dépendances et licences correctement attribuées
- [ ] Tests de validation pertinents avec statut GitHub Actions vérifié
- [ ] Gestion des données sensibles et signalement privé des vulnérabilités si applicable
- [ ] Documentation d'accessibilité et de compatibilité mobile si interface utilisateur
- [ ] Distinction claire entre **prototype**, **démonstration**, **beta** et **produit validé**
- [ ] Releases versionnées quand une distribution est prévue

Les cases non cochées représentent un **travail restant à confirmer**, et non une preuve d'absence ou d'échec dans tous les dépôts.

## Chevauchements à examiner — sans suppression automatique

- `EBM-BRETONNE.` / `nikogroove` : expériences musicales apparentées.
- `le-jardin-de-niko` / `oracle-du-jardinier` : périmètres voisins autour du jardin.
- `medicalvisionproai` / `Medivision-ai-pro` : noms proches, maturité et contenu différents.
- Toute éventuelle déclinaison privée d'un projet public : comparer les branches et l'historique avant une consolidation.

**Aucun dépôt n'a été archivé, supprimé, renommé, rendu public ou fusionné dans le cadre de cette revue.** La sélection du portfolio ne modifie pas le code des applications.

## Organisation GitHub recommandée

Utiliser les **Topics** natifs plutôt que renommer artificiellement tous les dépôts. Vocabulaire proposé : `cinema`, `generative-art`, `web-audio`, `healthtech`, `ai-agent`, `pwa`, `accessibility`, `indie-game`, `metrology`, `gardening`. Ajouter seulement les mots-clés pertinents à chaque dépôt.

Pour les dépôts mis en avant sur le profil, privilégier une sélection variée et réellement démontrable : `Vision-IA`, `galerie-studio-niko`, `Nikoassist`, `medicalvisionproai`, `the-lovestronautes-machine` et `handimonde`.

---

**Principe éditorial :** la confiance vient d'un état vérifiable, de crédits exacts et de limites visibles — pas de badges ou de certifications auto-déclarés.
