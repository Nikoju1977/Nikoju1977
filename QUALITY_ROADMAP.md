# Plan qualité du portfolio — Studio Niko Design

**Date de référence : 26 octobre 2026**  
**Compte :** [Nikoju1977](https://github.com/Nikoju1977)

## Périmètre vérifié

- **49 dépôts** accessibles en propriété lors de la dernière lecture : **45 publics** (profil inclus), **4 privés**. Trois dépôts publics précédemment inventoriés ne sont plus accessibles sur le compte ; deux liens obsolètes ont été retirés de la vitrine et une ancienne variante n'est plus répertoriée.
- Le [README du profil](README.md) met désormais en avant **39 projets publics sélectionnés** parmi les **44 projets publics** (hors dépôt de profil), dans 9 domaines. Les **4 variantes secondaires** et **1 projet non retenu éditorialement** ne figurent plus dans la vitrine. La sélection est documentée dans [CURATION.md](CURATION.md).
- Une lecture des fichiers racine et des README a été réalisée pour les projets publics ; l'examen des dépôts privés a été limité à leurs README ou points d'entrée pertinents.
- Les deux projets musicaux qui n'avaient pas de README en ont désormais un. Les dépôts privés ont été examinés séparément, sans diffusion de leur inventaire.
- **Les 49 dépôts actuellement visibles disposent d'un fichier README** (y compris `readme.md` en minuscules pour `radar-de-niko`).

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

Le profil privilégie désormais **une seule application représentative par famille fonctionnelle**. Quatre prototypes proches et un projet éditorial hors sélection ont été retirés du catalogue principal, sans suppression de code ni de dépôt. Les critères sont documentés dans [CURATION.md](CURATION.md). Cette sélection repose sur les fichiers et la documentation consultables : **elle ne prouve pas la qualité en production**, faute de tests fonctionnels comparatifs sur appareils réels.

Le nouveau projet public `White-hat` a été ajouté au catalogue dans la catégorie des outils métier et de sécurité. Sa présence ne vaut pas validation de ses fonctions d'audit.

## Contrôle automatique des applications HTML — 26 octobre 2026

- **20 dépôts web statiques** dépourvus de ce contrôle ont reçu le workflow `.github/workflows/static-html.yml`. Il vérifie sous GitHub Actions le point d'entrée `index.html` (DOCTYPE HTML5, balise `html`, titre et marqueurs évidents de conflit Git), sans dépendances logicielles ni secrets.
- **20 exécutions sur 20 ont été observées comme terminées avec succès** dans GitHub Actions lors du contrôle du 26 octobre 2026, notamment pour les applications de suivi, de musique/arts, de jardin, d'industrie et les démonstrations web concernées. Le [journal des Actions du compte](https://github.com/Nikoju1977?tab=repositories) permet de retrouver chaque projet ; exemple : [contrôle sur FibroCare](https://github.com/Nikoju1977/fibrocare/actions/runs/40355227644).
- **Portée stricte :** un test de structure HTML **n'atteste pas** du démarrage correct de JavaScript, du bon fonctionnement d'une API, de l'accessibilité, du contenu, de la protection des données, d'une installation PWA ni de la sécurité. Les dépôts dotés d'autres workflows n'ont pas été normalisés de force.

## Portfolio signature — identité et récit produit

Le profil GitHub affiche une signature graphique originale (`assets/studio-niko-cover.svg`), **six projets signature** documentés dans [SHOWCASE.md](SHOWCASE.md) et un accès repliable aux **39 projets retenus** dans neuf domaines. Le contrôle `scripts/check_portfolio.py` vérifie désormais aussi l'existence de l'identité graphique, des études de projet, des références et des rubriques repliables.

**La sélection est éditoriale.** Aucune disponibilité des démonstrations, certification ou compatibilité d'exécution n'est déduite de la présentation visuelle. Les projets tiers sont crédités selon leurs licences.

## Descriptions de chaque dépôt public — 26 octobre 2026

Le guide [PROJECTS.md](PROJECTS.md) décrit individuellement la vocation et les limites de **43 dépôts publics**, soit **39 projets de référence** et **4 variantes documentées à part**. Le projet exclu de la vitrine à la demande du propriétaire et les quatre dépôts privés ne sont pas répertoriés dans ce document public.

Le profil conserve neuf rubriques, et son script de vérification contrôle désormais la correspondance entre les **39 entrées du profil** et les **43 descriptions du guide**. La revue vérifie la cohérence documentaire, pas le fonctionnement applicatif ni la disponibilité des démos. Deux liens vers des dépôts qui ne sont plus accessibles ont été retirés du profil.

## Priorités techniques avant de qualifier un projet « prêt pour la production »

### Priorité 0 — Données sensibles et usages médicaux

| Dépôts | Vérification nécessaire |
| --- | --- |
| [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai), [Medivision-ai-pro](https://github.com/Nikoju1977/Medivision-ai-pro) | Distinguer le prototype d'imagerie opérationnel du simple starter PWA ; revoir formats, sécurité et exactitude des revendications |
| [OPENVITA-DT1](https://github.com/Nikoju1977/OPENVITA-DT1), [jarvisdiabete](https://github.com/Nikoju1977/jarvisdiabete), [compagnon-diabete](https://github.com/Nikoju1977/compagnon-diabete) | Séparer démonstration et décision de traitement ; revue clinique et protection des données avant tout usage réel |
| [dermato-ai](https://github.com/Nikoju1977/dermato-ai), [SCAN-BIOMEDICAL](https://github.com/Nikoju1977/SCAN-BIOMEDICAL), [agent-biometrique](https://github.com/Nikoju1977/agent-biometrique), [fibrobot](https://github.com/Nikoju1977/fibrobot), [fibrocare](https://github.com/Nikoju1977/fibrocare) | Revue des limites de modèles, des données médicales importées et de la terminologie clinique |
| [purescanai](https://github.com/Nikoju1977/purescanai) | Vérifier les fonctions annoncées d'analyse visuelle de la peau, les limites de l'IA dermatologique, la protection des images et l'absence de diagnostic médical validé |

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


## Clôture documentaire — 25 novembre 2026

Inventaire actuel : 58 dépôts, 53 publics et cinq privés non détaillés. Les 53 références publiques sont classées : 50 README de projets documentés, le dépôt de profil/Hub, le guide du fork Wan2GP et un dépôt vide. Cette couverture documentaire ne mesure ni la stabilité ni la sécurité. Les éléments ci-dessous sont des constats de lecture et des travaux proposés, non des correctifs exécutés.

| Priorité | Périmètre public | Action et preuve attendue |
| --- | --- | --- |
| P0 | Agent biométrique, SCAN-BIOMEDICAL | Neutraliser les scores et mesures non établis ; vérifier les états indisponibles sur données fictives. |
| P0 | OPENVITA-DT1, compagnon-diabete, aylina-is-cooking, fibrocare | Retirer les recommandations thérapeutiques et lectures non qualifiées ; vérifier leur absence dans tous les parcours. |
| P0 | Metrology-OS, cockpit-mecaria | Empêcher les décisions de conformité avec entrées invalides ou preuves insuffisantes ; comparer à des oracles indépendants. |
| P0 | purescanai, dermato-ai, medicalvisionproai | Séparer résultats générés et mesures ; limiter aux données synthétiques, qualifier géométrie et confidentialité. |
| P1 | Galerie, Boutique Morgane, assistants et applications avec IA distante | Revoir autorisations, consentement, gestion des secrets et rendu de contenus non fiables ; tests sur environnement isolé. |
| P1 | Annales Akashiques, Aylina, studio de cadrans | Corriger stockage en clair, affichages simulés et traitement de contenu non fiable ; vérifier suppression et confidentialité. |
| P1 | Radar | Séparer strictement fixtures fictives et collecte réelle ; conserver provenance et dates. |
| P1 | AEGIS Earth, Galerie | Clarifier les déclarations MIT sans fichier autonome ; respecter droits tiers. |
| P2 | Audio, cinéma, jeux, art, PWA | Vérifier démarrage, stabilité, exports, parité des éditions, clavier/tactile et appareils physiques. |
| P2 | L'Ultime Confrontation, présentation-medtronic | Ressource audio manquante ; maquette HTML incomplète à reconstruire avec sources autorisées. |

Critère de clôture : commit de correction identifié, reproduction sur données fictives ou environnement autorisé, résultat de test daté et vérification distincte de production. Aucun score global de qualité ni certification déduit. Ne pas modifier le registre historique de preuves, ne pas publier les dépôts privés. Aucun coût additionnel autorisé.


## Correction P0 — lot 1 (25 novembre 2026)

- [agent-biometrique](https://github.com/Nikoju1977/agent-biometrique/commit/7d94d7666ac1ec8c98f4256d689639c49996688e) : Aperçu caméra facultatif, scores et alertes fictifs retirés du code. Aucune mesure biométrique ; cycle caméra à qualifier.
- [SCAN-BIOMEDICAL](https://github.com/Nikoju1977/SCAN-BIOMEDICAL/commit/416dce75f69b5d93d1bd49836a6e9f0c1844de4b) : Repères faciaux expérimentaux et EAR ; pouls et fatigue retirés. Aucun usage médical ; modèle, permissions et suivi à qualifier.
- [aylina-is-cooking](https://github.com/Nikoju1977/aylina-is-cooking/commit/c25e48bdf50a7f6b8eb6e9f7879b363a3d80e3e0) : Calcul alimentaire par portion et favoris locaux ; dose retirée, IA suspendue. Aucun calcul de traitement ; favoris non chiffrés, ancien profil effaçable volontairement.

Sources relues après publication, empreintes SHA vérifiées ; aucun nouveau test d'exécution ou déploiement vérifié. Les constats antérieurs sont historiques, non des preuves de l'état actuel. Le chef distant est suspendu par précaution ; pas de suppression automatique des anciennes données locales.


## Correction P0 — lot 2, étape 1 (25 novembre 2026)

[compagnon-diabete](https://github.com/Nikoju1977/compagnon-diabete/commit/d773c0a540ac858a21898b4a1c4c27911725d4e5) : retrait des chemins de calcul de bolus, lecture Bluetooth, graphique fictif, IA distante, caméra et microphone de l'entrée HTML. Guide conservé. Source relue après publication ; aucun test navigateur ni déploiement vérifié. Données anciennes non supprimées automatiquement. OPENVITA-DT1 et fibrocare restent à corriger.


## Fiabilisation fonctionnelle — DAPHNÉE OMNI (25 novembre 2026)

[Commit fonctionnel](https://github.com/Nikoju1977/compagnon-diabete/commit/a41a5043e37fdb3ceb4b39890ab54011d04381a2) : le journal descriptif remplace la maquette transitoire. Saisie avec unité explicite, modification, suppression, filtre, sauvegarde et restauration chiffrées implémentés. 13 assertions de validation des données ont réussi en JavaScript. Source relue ; tests navigateur, cryptographie bout en bout et publication non vérifiés. Fonctions médicales à risque toujours suspendues jusqu'à qualification. Aucune licence modifiée.

Principe : conserver les fonctions utiles, corriger leur moteur et ne désactiver que les chemins non qualifiés présentant un risque significatif ; ne pas assimiler une maquette à une application stable.


## Fiabilisation FibroCare (25 novembre 2026)

[Correctif journal et PDF](https://github.com/Nikoju1977/fibrocare/commit/9f3b3c58582d5d1e17038bba589ea512e71eb1c7) et [dialogue de sauvegarde masqué](https://github.com/Nikoju1977/fibrocare/commit/5e0aee76c991cb3b7f72ad573e4642d298ec9341). Interface conservée ; sauvegarde chiffrée de cinq rubriques, restauration validée, effacement ciblé, PDF paginé et graphiques triés. 12 assertions de validation réussies ; sources relues. Stockage actif en clair, clés historiques génériques, contenu médical et tests de navigateur/crypto/PDF/déploiement encore à qualifier. Aucun changement de licence.


## Fiabilisation OPENVITA-DT1 (25 novembre 2026)

[Journal chiffré](https://github.com/Nikoju1977/OPENVITA-DT1/commit/536ca5fa3eca91463bfb29fcf1f8659d920375c7) et [restauration portable](https://github.com/Nikoju1977/OPENVITA-DT1/commit/45c7c00fe8e0567ce5bca165896cb2dffecfc2a6). Coffre persistant AES-GCM, observations manuelles et repas, historique et statistiques par unité, sauvegarde et restauration chiffrées. 14 assertions JavaScript réussies ; source relue. Les fonctions thérapeutiques et IA non qualifiées sont suspendues, anciennes données conservées sans migration automatique. Aucun test navigateur, crypto bout en bout ou déploiement vérifié. MIT inchangée.


## Fiabilisation Metrology-OS (25 novembre 2026)

[Calculs et règles de décision](https://github.com/Nikoju1977/Metrology-OS/commit/a9f177b390d79f3b19e686b495d76c0b1791ddba) ; [priorité non-conformité](https://github.com/Nikoju1977/Metrology-OS/commit/338080ef2ce8538cfb0fa2b03ccf2f55e230a773). 25 + 4 assertions JavaScript réussies, sources relues. Entrées strictes, coefficient nul, k configurable, comparaison décimale, décision incomplète non conforme à une libération, remise en service/échéance non automatiques. Tests navigateur et qualification industrielle non réalisés. Licence inchangée.


## Fiabilisation Cockpit Mecaria (25 novembre 2026)

[Correctif TRS, SPC et R&R](https://github.com/Nikoju1977/cockpit-mecaria/commit/2ac451b1bf9e6a5a51ba88253b24a348211e0fbc) ; [SHA-256 et KPI R&R](https://github.com/Nikoju1977/cockpit-mecaria/commit/a39b35c9087901419a1058485a44a719310a7160). 22 assertions TRS et validation numérique réussies ; sources relues. MSP/R&R et IA : corrections codées, tests d'exécution indépendants restant à réaliser. Interface et modules conservés ; aucune qualification industrielle ni déploiement vérifié. Licence inchangée.


## Fiabilisation RAUSBEAT 5.1 RC1.2 (25 novembre 2026)

Candidat local construit depuis l'archive 5.1 RC1.1, distinct de Rave Generator 2. Arrêt du transport sécurisé, isolation des erreurs MIDI/deck et des blocs PCM entre prises, protection des écritures OPFS, cache PWA révisé. 23 suites Node réussies (30 nouvelles assertions). Chromium headless : lecture 8 s, arrêt, reprise 2,5 s, arrêt ; 63 pas, zéro erreur de pas et zéro voix/graphe actif après arrêt. Deux exports WAV 24 bits non silencieux avec entrée et OPFS simulés. Accès HTTP local bloqué dans l'environnement, tests avec scripts intégrés ; ni AudioWorklet en navigateur, ni périphérique physique, ni session longue ni PWA validés. Archive locale préparée ; aucune publication du code RAUSBEAT ni modification de production. Ne pas fusionner avec Rave Generator 2. Licences inchangées.


## NIKO Studio Audio V5 RC1 — fiabilisation (25 novembre 2026)

Candidat construit depuis l'archive locale V4 PWA complète ; aucun dépôt V5 exact ni hébergement identifié. Ne pas fusionner avec Rausbeat / Rave Generator 2 / Niko Music Lab. Dix pistes, séquenceur, piano roll, arrangeur, 32 bandes et effets conservés. Initialisation audio sérialisée, rattrapage borné, nettoyage des sources et graphes, fermeture de contexte au STOP, cache de saturation, limites mémoire, import projet confirmé. Chromium headless avec HTML/CSS/JS intégrés (navigation locale bloquée) : lecture 6,5 s, 58 pas planifiés au contrôle, zéro erreur scheduler, reprise 1,8 s, 76 pas cumulés ; zéro source/groupe/temporisation après premier STOP. Export WAV non silencieux 2 343 320 octets, PCM 24 bits stéréo 48 kHz ; en-tête MIDI type 1, 11 pistes tempo inclus. Syntaxe JS vérifiée. Aucun test physique, écoute, capture micro/MIDI/live, IndexedDB, PWA ou déploiement revendiqué. Archive NIKO_STUDIO_AUDIO_V5_RC1_CORRIGE.zip et rapport QA-V5-RC1.json générés localement. Schéma projet v4 conservé pour compatibilité.


## Fiabilisation IA Studio Ciné (25 novembre 2026)

[Rendu local](https://github.com/Nikoju1977/ia-studio-cine/commit/fe85546690a0090c942fe569e687e1c0f7fd4201), [LTX-2.3](https://github.com/Nikoju1977/ia-studio-cine/commit/28ad3fb411e0d1b5402e4b259e014f407a511e29), [LTX 13B](https://github.com/Nikoju1977/ia-studio-cine/commit/c7031929f0b078d20fef8d9339b2db4410e4caa1). 14 assertions timeline + 7 assertions SSE réussies sur fonctions isolées ; tests de régression ajoutés ; sources relues. Limites mémoire/rendu, arrêt en suspension, parsing SSE fragmenté et délai local borné. Génération GPU, rendu réel, CI et déploiement non vérifiés. Fonctions et licences historiques conservées.


## Fiabilisation NikoAssist (25 novembre 2026)

[Politique](https://github.com/Nikoju1977/Nikoassist/commit/7d8ce3b6adef907d3207ce276b046e2dfdabbf2d), [agent_team](https://github.com/Nikoju1977/Nikoassist/commit/8602aed25ecb176564bcabfca63be838d73a5b30), [runtime](https://github.com/Nikoju1977/Nikoassist/commit/08062facc9c6cf41d75299be8281fb1243f15700). Budget global, exclusion des appels de contrôle des preuves métier, arrêt après rôle mutateur sans vérification indépendante, pas de relance créateur/opérateur, approbation explicite du runtime auxiliaire. Six fichiers relus, tests de régression publiés, CI finale en attente au contrôle. Run intermédiaire de publication full-source 45703897282 en échec à la mise à jour fast-forward après syntaxe réussie ; cause exacte à établir. Aucune exécution fournisseur réelle, connexion PWA-runtime ou qualification mobile. GPL inchangée.


## Qualification générale — contrôle CI du 25 novembre 2026

| Application | Preuve GitHub observée | Périmètre |
|---|---|---|
| compagnon-diabete | [Pages 45701050061](https://github.com/Nikoju1977/compagnon-diabete/actions/runs/45701050061) : succès | Déploiement, pas de test clinique ni navigateur |
| fibrocare | [CI 45701374662](https://github.com/Nikoju1977/fibrocare/actions/runs/45701374662), [Pages 45701372572](https://github.com/Nikoju1977/fibrocare/actions/runs/45701372572) : succès | Contrôle statique et publication |
| OPENVITA-DT1 | [CI 45701619338](https://github.com/Nikoju1977/OPENVITA-DT1/actions/runs/45701619338), [Pages 45701619510](https://github.com/Nikoju1977/OPENVITA-DT1/actions/runs/45701619510) : succès | Contrôle statique et publication |
| Metrology-OS | [CI 45701868558](https://github.com/Nikoju1977/Metrology-OS/actions/runs/45701868558) : succès | Contrôle statique |
| cockpit-mecaria | [CI 45702063750](https://github.com/Nikoju1977/cockpit-mecaria/actions/runs/45702063750), [Pages 45702065489](https://github.com/Nikoju1977/cockpit-mecaria/actions/runs/45702065489) : succès | Contrôle statique et publication |
| IA Studio Ciné | [Quality Gate 45703635631](https://github.com/Nikoju1977/ia-studio-cine/actions/runs/45703635631) : échec, Pages réussi | Journal : identifiant manual-export-download absent du HTML alors que le JS le crée dynamiquement. [Correctif](https://github.com/Nikoju1977/ia-studio-cine/commit/b883bd8e381a3f1f7dad4e106cb25d5b4d17988a) : lien statique masqué, contrôle d'unicité réussi. Nouvelle [CI](https://github.com/Nikoju1977/ia-studio-cine/actions/runs/45704278073) en cours au contrôle. |
| NikoAssist | [CI 45703997736](https://github.com/Nikoju1977/Nikoassist/actions/runs/45703997736) : succès | Publication full-source 45703897282 rejetée (fetch first, écriture concurrente). [Correctif](https://github.com/Nikoju1977/Nikoassist/commit/40bd2b32b66395b1bc18b3a744ead8e2c84e9176) : groupe de concurrence, pas d'annulation du job actif, checkout main courant, push non forcé conservé. [Nouveau run](https://github.com/Nikoju1977/Nikoassist/actions/runs/45704298813) en attente au contrôle. |
| Rausbeat / NIKO Studio Audio | Archives candidates testées localement, pas de nouvelle publication | Pas d'assimilation à un autre dépôt |
| Portfolio | [CI catalogue 45704008846](https://github.com/Nikoju1977/Nikoju1977/actions/runs/45704008846) : succès | Contrôle du catalogue uniquement |

Ne pas déduire une stabilité opérationnelle, une certification ou un essai physique d'un run statique ou Pages. Les corrections CI ci-dessus doivent être recontrôlées à leur SHA.


## Qualification opérationnelle — 25 novembre 2026

Les cinq workflows de correction du lot précédent sont terminés avec succès : IA Studio Ciné [Quality Gate](https://github.com/Nikoju1977/ia-studio-cine/actions/runs/45704278073), [V5](https://github.com/Nikoju1977/ia-studio-cine/actions/runs/45704278046), [Pages](https://github.com/Nikoju1977/ia-studio-cine/actions/runs/45704276669) ; NikoAssist [tests et intégration](https://github.com/Nikoju1977/Nikoassist/actions/runs/45704298706), [publication source](https://github.com/Nikoju1977/Nikoassist/actions/runs/45704298813). OPENVITA-DT1 : [test navigateur](https://github.com/Nikoju1977/OPENVITA-DT1/commit/70155b5a9403785316bffe795fa0d53f4515058f), [workflow](https://github.com/Nikoju1977/OPENVITA-DT1/commit/54a23523e8abe1592be939e00a22caba771cd51f), [run Chromium 45704539496](https://github.com/Nikoju1977/OPENVITA-DT1/actions/runs/45704539496) réussi. Web Crypto réel, stockage local, export blob, rejet mot de passe erroné et ciphertext altéré, rechargement, modification/suppression, restauration dans un autre coffre au sein du profil de test, viewport mobile simulé, absence de POST. Données synthétiques, pas de test physique ni qualification clinique. Application MIT ; banc de test autonome adapté de NikoAssist sous GPL-3.0-or-later, licence fournie.
