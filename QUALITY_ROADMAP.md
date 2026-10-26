# Plan qualité du portfolio — Studio Niko Design

**Date de référence : 26 octobre 2026**  
**Compte :** [Nikoju1977](https://github.com/Nikoju1977)

## Périmètre vérifié

- **51 dépôts** accessibles en propriété : **47 publics** (profil inclus), **4 privés**.
- Le [README du profil](README.md) indexe les **46 dépôts de projets publics** dans 9 domaines.
- Une lecture des fichiers racine et des README a été réalisée pour les projets publics ; l'examen des dépôts privés a été limité à leurs README ou points d'entrée pertinents.
- Les deux projets musicaux qui n'avaient pas de README en ont désormais un ; le dépôt privé `medvisionproai` en a également reçu un.
- **Les 51 dépôts disposent maintenant d'un fichier README** (y compris `readme.md` en minuscules pour `radar-de-niko`).

**Limite de cette revue :** la présence d'un fichier, d'un workflow ou d'un texte documentaire ne prouve ni réussite de build, ni couverture de tests, ni conformité RGAA/WCAG, ni sécurité effective. Aucune exécution globale des applications ou analyse approfondie de leurs dépendances n'est attestée.

## Travaux documentaires réalisés

- Profil public restructuré par thème, avec vitrines sélectionnées et avertissement sur la maturité des projets.
- README créés : `EBM-BRETONNE.`, `nikogroove`, et `medvisionproai` (privé).
- README clarifiés : `handimonde`, `presentation-medtronic`, `Medivision-ai-pro`, `agent-biometrique`, `compagnon-diabete`, `daphnee-compagnon`, `applewatchcadrans`, `aylina-is-cooking`, `ia-studio-cine`, `fibrobot`, `SCAN-BIOMEDICAL`, `haomassage-sandra`, `miaotris`, `les-annales-akashiques`, `oracle-du-jardinier`, `purescanai`, `Neural-Art-mars-2026`, `l-ultime-confrontation`.
- Dépôts privés documentés sans changer leur visibilité : `galerie-niko-repo`, `le-s-raphin-livre`, `ron`, `medvisionproai`.

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
- `Ron-` public / `ron` privé : comparer les branches et leur historique avant une consolidation.

**Aucun dépôt n'a été archivé, supprimé, renommé, rendu public ou fusionné dans le cadre de cette revue.**

## Organisation GitHub recommandée

Utiliser les **Topics** natifs plutôt que renommer artificiellement tous les dépôts. Vocabulaire proposé : `cinema`, `generative-art`, `web-audio`, `healthtech`, `ai-agent`, `pwa`, `accessibility`, `indie-game`, `metrology`, `gardening`. Ajouter seulement les mots-clés pertinents à chaque dépôt.

Pour les dépôts mis en avant sur le profil, privilégier une sélection variée et réellement démontrable : `Vision-IA`, `galerie-studio-niko`, `Nikoassist`, `medicalvisionproai`, `the-lovestronautes-machine` et `handimonde`.

---

**Principe éditorial :** la confiance vient d'un état vérifiable, de crédits exacts et de limites visibles — pas de badges ou de certifications auto-déclarés.
