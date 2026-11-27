# Studio Niko Hub

Portail public de **Studio Niko Design** — catalogue des dépôts publics, recherche, univers, favoris locaux, accès RON et PWA.


## Actualisation du 27 novembre 2026 — NIKO 3D VIBES

Le [projet NIKO 3D VIBES](https://github.com/Nikoju1977/Niko-3D-VIBES) rejoint le catalogue Art & 3D et le registre de pilotage : 59 dépôts recensés, 54 publics et 5 privés non détaillés. Le [commit source](https://github.com/Nikoju1977/Niko-3D-VIBES/commit/ce3f4f3026b7673c4abfce70405011cec26a968b) est vérifié sur GitHub. Les tests Node et le build de la [CI](https://github.com/Nikoju1977/Niko-3D-VIBES/actions/runs/45938198279) ont réussi, mais son installation Chromium a échoué et le test navigateur n'a pas été exécuté. Aucun accès de production, essai physique, intégration Core ou preuve de provenance nouvelle n'est revendiqué. La campagne historique du 25 novembre (53 dépôts) reste inchangée.

## Portfolio technique — 25 novembre 2026

[50 README publics documentés et références de licence](../PROJECTS.md#registre-technique--50-dépôts-documentés) ; 53 entrées publiques vérifiées par inventaire. Les descriptions de N8V (NIKO ANALOG 37, non codec), META-STUDIO V6 et des prototypes biomédicaux sont actualisées. Les états HTTP historiques restent datés ; aucun nouveau test fonctionnel ni redéploiement n'est revendiqué.

## Pilotage Studio Niko Core

Le fichier [`pilotage.html`](./pilotage.html) contient un tableau public autonome et responsive : **53 dépôts publics dans le registre du 24 novembre 2026**. Recherche, domaine, priorité, état du socle, liens vers les dépôts et liens de publication connus.

Les statuts « déploiement non confirmé » et « fonctionnement non confirmé » sont volontairement distincts des commits GitHub. Le tableau ne sonde pas le réseau en arrière-plan, ne simule pas les résultats et ne publie aucun nom de dépôt privé. Le suivi manuel des modules, versions, blocages et décisions s'enregistre dans le navigateur et propose un export/import JSON. Aucune déclaration utilisateur n'est promue au rang de preuve automatique. Le registre source est [`../studio-niko-core/registry.json`](../studio-niko-core/registry.json) ; pour mettre à jour le snapshot de la page : `node studio-niko-core/tools/refresh-hub.mjs --apply` depuis la racine du dépôt.

## Suivi de la phase B (22 novembre 2026)

Le registre et le tableau `pilotage.html` distinguent désormais l'état des **six applications prioritaires** : quatre parcours ont des correctifs partiels committés (cinéma, audio, AutoCoder, Niko Emploi) et deux restent définis sans validation de cette phase (Galerie Studio Niko et NikoAssist). Chaque fiche décrit les limites et, lorsque disponible, renvoie à la procédure du dépôt. Aucun « code committé » n'est transformé en preuve de déploiement ou de fonctionnement sur appareil.

La dernière vague renforce la récupération locale de projets AutoCoder et corrige les exports iCalendar, CSV et JSON du radar Niko Emploi. Le shell public du radar est référencé dans son cache PWA ; seules les notes locales déjà enregistrées peuvent être affichées hors connexion, pas les APIs de recherche.

## Preuves de qualité (25 novembre 2026)

[Tableau des preuves](quality.html) et [instantané JSON](quality-evidence.json) : 53 dépôts publics, 4 633 fichiers audités, 52 contrôles Docker d’intégrité et quatre comparaisons fonctionnelles ciblées. Les preuves historiques sont séparées des états de production. Le catalogue et les licences existants sont conservés.

## Actualisation documentaire du catalogue — 25 novembre 2026

Les 50 références du registre technique sont distinctes des 53 entrées de l'inventaire public et des six projets signature. Les fiches de UltraVision, AutoEntrepreneur 1M, Niko Emploi, Sage et Niko Live Commander précisent les frontières d'exécution constatées dans les sources. Les champs de statut HTTP et de déploiement restent historiques et inchangés. Aucun nouveau test, contrôle HTTP ou redéploiement n'est attesté ici.

[Registre public des README et licences](../PROJECTS.md#registre-technique--50-dépôts-documentés).

## Complément documentaire

50 README publics et un guide de fork distinct ; deux déclarations MIT dans package.json sans fichier autonome identifié. Les fiches de cybersécurité, géospatial, commerce, accessibilité et galerie 3D ont été revues. Aucun nouveau contrôle HTTP, essai matériel ou déploiement n'est attesté. Les preuves historiques restent inchangées.

## Correction de périmètre — traitement du signal et biométrie

DBMètre : RMS/FFT, moyenne arithmétique des dB distincte du Leq. Agent biométrique : scores et alertes simulés, sans mesure issue de la caméra ; correction applicative prioritaire. MedVision public : MPR et projections min/max, non qualifiées cliniquement. Le catalogue et les notices ont été corrigés ; cache versionné renouvelé dans le code, déploiement non vérifié.

## Complément — assistants documentaires et starter PWA

DiabCare : chemins Qwen/Whisper locaux optionnels et coffre, sans commande de pompe ni calcul de dose. Daphnée : lecture Bluetooth non fiable, ne pas connecter de dispositif réel. Medivision-ai-pro : starter PWABuilder sans moteur d'imagerie établi. Les notices du Hub distinguent ces périmètres ; aucune validation clinique, compilation ou publication de production nouvelle.

## Complément — jardin et veille territoriale

Les notices précisent les limites des profils de sol déclarés, des calendriers lunaires approximatifs et des conseils IA. Radar utilise un dédoublonnage heuristique ; le mode stub produit des données fictives, à isoler de toute publication réelle. Aucun nouvel appel API ni déploiement vérifié.

## Complément — synthèse audio et jeux

Cyber-Fest-Noz : synthèse d'anche, bourdon et enregistrement dépendant du navigateur. Miaotris : moteur de blocs distinct du sous-projet Alyina ; le lien Vercel historique ne valide pas le jeu racine. Cosmo Citrouille : 140 configurations et chrono de simulation, sans binaire mobile validé. Aucun nouvel essai ni déploiement vérifié.

## Complément — expériences symboliques

Tarot : mélange Fisher–Yates et journal chiffré. Hermès : graphe, calculs approximatifs et clés chiffrées ; liens pouvant exposer les paramètres de naissance. Annales : journal et brouillons non chiffrés, ne pas saisir de données intimes. Aucune prédiction scientifique, validation cryptographique nouvelle ni exécution distante revendiquée.

## Complément — jeux et applications quotidiennes

BOUH! Delivery est un jeu fictif. Aylina contient une estimation de dose non validée à retirer. Le studio de cadrans exporte des concepts graphiques, pas des cadrans watchOS natifs ; les indicateurs de capteurs sont fictifs. Aucun nouveau test ni déploiement vérifié.

## Clôture documentaire

53/53 références classées : 50 README de projets, profil/Hub, guide du fork Wan2GP et dépôt vide rf-metrolgy-pro (confirmé par GitHub). La présentation Medtronic est une maquette incomplète ; L'Ultime Confrontation est un site promotionnel avec ressource audio manquante. [Plan qualité](../QUALITY_ROADMAP.md). Aucun nouveau test fonctionnel ou déploiement vérifié.

## Principe

- Source : dépôt GitHub \`Nikoju1977/Nikoju1977\`, répertoire \`hub/\`.
- Le catalogue et le registre **actuels** n'affichent que les dépôts publics. Les commits historiques constituent une surface distincte ; leur purge éventuelle nécessite une intervention dédiée.
- \`catalog.json\` est généré à partir de la liste des dépôts publics accessibles le 4 novembre 2026 (actualisation ultérieure explicite).
- Un lien \`demoUrl\` signale **une adresse annoncée par la documentation**, pas un test de disponibilité ni une garantie de fonctionnement.
- La rubrique RON est un **lancement vers l'application existante**, pas une intégration de son runtime IA.
- N8V héberge actuellement **NIKO ANALOG 37**, instrument de musique ; son nom de dépôt historique ne décrit plus le contenu actuel.
- Les favoris et le journal de production de `pilotage.html` sont locaux au navigateur. Aucune synchronisation de suivi ni télémétrie ne sont activées.
- Les domaines médico-sanitaires sont des prototypes, non des dispositifs médicaux certifiés.
- Les dépôts liés à des projets tiers conservent leurs licences et attributions propres.

## Développement

Depuis \`hub/\`, lancer \`python3 -m http.server 8000\` puis ouvrir \`http://localhost:8000\`.
La PWA n'est pas utilisable depuis \`file://\`.
Les contrôles de recherche, catégorie, favoris, tri et navigation sont en JavaScript natif.

## Publication

- **Vercel** : créer un projet lié à \`Nikoju1977/Nikoju1977\` avec root directory \`hub\`, framework \`Other\` / \`null\`, aucun build.
- **Cloudflare Workers Static Assets** : depuis \`hub\`, utiliser Wrangler et la configuration \`wrangler.jsonc\`, une fois l'accès au compte établi. Vérifier les quotas gratuits.
- **GitHub Pages** : héberger la branche avec le dossier comme racine du site publié, ou copier uniquement le bundle du dossier \`hub\`.

Le plan gratuit Vercel Hobby est réservé aux usages non commerciaux ; vérifier les conditions d'utilisation si le site devient commercial. Les sites dynamiques, modèles IA, bases de données, GPU et paiements exigent leurs infrastructures propres.

## Feuille de route

1. Vérification de l'accessibilité HTTPS de chaque démo publiée et des interactions sur appareils réels.
2. Automatisation du rafraîchissement de \`catalog.json\` depuis l'API GitHub publique (sans dépôts privés).
3. Contrats d'échange de projets entre Vision-IA / META-STUDIO / UltraVision et Audio Lab.
4. SSO et espaces privés éventuels — jamais de partage automatique de données de santé.
5. Intégration RON via une API dédiée, uniquement avec authentification/permissions et protection des secrets.


## Vérification des applications — novembre 2026

- Lancer l'application via **Lancer ↗** dans le catalogue. L'app s'ouvre sur **son propre domaine** ; elle n'est ni copiée ni exécutée magiquement dans le Hub.
- Les déploiements Vercel publics **READY** ajoutés : Niko Emploi, Handimonde, Alyina (dépôt \`miaotris\`) et Galerie Studio Niko. Ce statut garantit seulement un déploiement prêt.
- Les démos GitHub Pages existantes sont conservées comme **liens documentés non certifiés**.
- Les applis avec protection Vercel ne sont pas rendues publiques automatiquement. Les projets privés sont exclus.
- Le bouton **Tester les accès** appelle \`/api/health?slug=<slug>\`, qui vérifie le statut **HTTP** côté serveur. Seuls les liens déjà présents et les hôtes \`*.vercel.app\` ou \`nikoju1977.github.io\` sont autorisés. Ce contrôle ne valide pas les flux de traitement, l'audio, les modèles ou les clés.
- \`node hub/check.cjs\` vérifie la validité du catalogue, les identifiants de la page, les liens HTTPS et l'absence des dépôts privés ciblés.

### Limitations irréductibles au portail

Une application qui réclame GPU, base de données, backend, clé API, flux tiers, connexion Google/TikTok ou autorisations microphone/caméra doit être configurée et validée **dans son dépôt respectif**. La présence dans le catalogue ne la rend pas fonctionnelle. Certains déploiements Vercel ont besoin de corrections distinctes.


## Vérification d'accessibilité du 4 novembre 2026

Parmi **47 dépôts publics**, **39 applications/pages** ont désormais un lien vérifié par réponse HTTP **200**. Le catalogue affiche uniquement ces liens dans le filtre « Ouvrir une application ». Les autres restent consultables par leur code source, ou protégées, ou nécessitent du matériel/serveurs spécifiques.

- 23 liens GitHub Pages déjà publiés ont été ajoutés au catalogue, sans créer d'hébergement inutile.
- Le lien AEGIS/White-hat en 404 a été réparé en déployant un nouveau projet public : <https://aegis-white-hat.vercel.app/>.
- L'ancien lien d'AEGIS renvoyait 404, il ne doit plus être utilisé.
- Les 39 contrôles HTTP ne garantissent pas que les fonctionnalités internes, les autorisations navigateur, les abonnements, les intégrations ou les modèles IA fonctionnent.
- Les projets non publiables comme un moteur GPU et un dépôt vide ne sont pas présentés comme utilisables.
- Les informations liées à l'insuline, au diabète ou à la dermatologie sont présentées uniquement comme prototypes non certifiés ; les services commerciaux exigent un hébergement contractuellement adapté.

La commande \`node hub/check.cjs\` valide les invariants du catalogue et les liens internes du Hub.


## Atelier de projets (v1)

L'atelier sous \`#atelier\` permet de créer jusqu'à 40 projets **locaux** avec notes et étapes, d'importer et exporter un projet au format \`studio-niko-project-v1\`, et de lancer volontairement un transfert de maximum 20 tâches à l'application Nikoassist Web via un fragment \`#handoff\`.

Les projets ne sont pas synchronisés sur le réseau. Le transfert n'a lieu qu'après confirmation dans le Hub **et** acceptation dans Nikoassist ; ne pas l'utiliser pour des projets médicaux, confidentiels ou professionnels sensibles. Le fragment URL ne se retrouve pas dans la requête HTTP, mais la page cible peut en lire le contenu. Il n'existe pas encore de partage de timeline, médias, modèles IA ou de fichiers entre les applications.


## Nikoassist Web — réparation et transfert

La configuration Vercel \`nikoassist-pwa\` a été réparée en ajoutant \`web/\` à \`Nikoju1977/Nikoassist\` et en réglant la racine projet sur ce dossier. Nouvelle adresse publique : <https://nikoassist-pwa.vercel.app/>.

La version web sans clé fonctionne pour Wikipédia, la météo Open-Meteo, les calculs et la liste de tâches locale. Les fonctions Python agentiques d'origine ne sont **pas** disponibles dans le navigateur. Le Hub peut transmettre explicitement jusqu'à 20 tâches non sensibles via URL-fragment avec consentement des deux côtés.

Le catalogue compte maintenant **40 liens d'applications** ; l'état de disponibilité HTTP ne garantit pas les fonctionnalités de chaque application.


## Metrology-OS : démonstration publique

L'interface V4 autonome est déployée en démonstration sur <https://metrology-os-demo.vercel.app/> (HTTP 200 vérifié). Le projet Vercel industriel initial reste inchangé et protégé. L'interface n'est pas validée pour des certificats accrédités ni pour des données d'entreprise confidentielles.

Le catalogue compte **41 accès directs** au 4 novembre 2026.


## Installation PWA — Android, iPhone et ordinateur (4 novembre 2026)

- Le site dispose désormais d'un manifeste avec icônes PNG 192×192 et 512×512, d'un service worker, et du bouton **Installer la PWA**.
- Avec Chrome pour Android : sélectionner **Installer la PWA** ; sinon ouvrir le menu ⋮ → « Installer l'application » / « Ajouter à l'écran d'accueil ». Samsung Internet possède sa propre option d'ajout.
- Avec Safari sur iPhone : **Partager → Sur l'écran d'accueil → Ajouter**. Sur Chrome/Edge desktop, utiliser l'icône d'installation ou le menu du navigateur.
- Une PWA installée par le navigateur n'est pas un fichier APK ou IPA signé distribué via les magasins. Son installation dépend des conditions et options du navigateur et de l'appareil.
- Les ressources statiques sont mises en cache ; les services distants (météo, Wikipédia, APIs et autres pages externes) ne fonctionnent pas hors ligne.


## Modes d'emploi intégrés

Chaque carte du catalogue affiche un bouton **? Mode d'emploi** ouvrant une notice propre à l'application : démarrage, prérequis, précautions, dépannage, liens d'ouverture et documentation. Les 47 notices sont conservées dans `guides.json`, mis en cache par la PWA (`guide.js`). Les projets sans interface publiable disposent malgré tout de leur notice depuis le Hub.

## Constructions de préproduction vérifiées le 22 novembre 2026

Quatre déploiements Vercel ont retourné **READY** pour des commits identifiés. Cette preuve est limitée à la construction Vercel, sans validation de l'interface, du moteur métier, des services externes ni des appareils PC, Android, iPhone, Mac et tablette. Les versions de production ne sont pas remplacées par ces aperçus.

| Projet | Commit | Aperçu Vercel | Limite |
| --- | --- | --- | --- |
| AutoCoder | `8e959322` | https://autocoder-studio-niko-gm58spo09-nikoju1977s-projects.vercel.app | Pyodide et exports non vérifiés |
| Niko Emploi | `48fd0890` | https://niko-emploi-9yngjw7bk-nikoju1977s-projects.vercel.app | Recherche et candidatures non vérifiées |
| NikoAssist | `d8b9f7ba` | https://nikoassist-au2acec1m-nikoju1977s-projects.vercel.app | Permissions et orchestration non vérifiées |
| Studio Niko Hub | `27ec7656` | https://studio-niko-8xd269fjc-nikoju1977s-projects.vercel.app | Présentation et suivi navigateur non vérifiés |

Le tableau de pilotage montre désormais ce niveau de preuve sur les fiches correspondantes, distinct du « fonctionnement réel » toujours **non confirmé**. L'aperçu n'est pas une preuve de stabilité. Aucun test d'appareil n'a été revendiqué.


## Mise à jour du catalogue — 22 novembre 2026

Le Hub d'accueil répertorie maintenant **50 dépôts publics**, comme le registre de pilotage, et comporte **50 modes d'emploi**. Les cinq dépôts privés sont exclus. Le relevé historique du 4 novembre (47 dépôts et ses liens testés à cette date) reste un état antérieur, pas le total actuel.

Ajouts vérifiés par lecture des dépôts et contrôle HTTP 200 des pages de production :

- **AutoCoder-Studio-Niko** — https://autocoder-studio-niko.vercel.app/ ; modèles locaux, édition, Pyodide et API IA optionnelle non configurée.
- **niko-commande-live-tik-tok** — https://niko-live-commander.vercel.app/ ; conducteur de préparation hors ligne, pas une commande directe de TikTok/OBS/Pioneer.
- **Rave-Generator-2** — https://rave-generator-2.vercel.app/ ; groovebox Web Audio et fonctions WAV/MIDI dont le rendu sur appareils doit être validé.

Le statut `page-responding` signifie **HTML HTTP 200 à la date indiquée** et non validation des fonctions, des exports, du streaming, du moteur IA, de l'Android ou de Safari iPhone. L'assertion `node hub/check.cjs` vérifie maintenant l'égalité exacte des dépôts publics du catalogue, du registre et des notices, plutôt qu'un total historique fixé à 47. Le cache PWA est renouvelé (`studio-niko-hub-v12-catalog50`).

## Preuves de publication consignées le 22 novembre 2026

Le registre public `studio-niko-core/registry.json` et le tableau `hub/pilotage.html` contiennent un **instantané daté** des versions constatées, et non une supervision continue. Le terme `READY` vient des métadonnées Vercel du projet et du commit exact, indépendamment des tests GitHub.

| Application | Production Vercel relevée | Niveau de preuve |
| --- | --- | --- |
| AutoCoder | `066cdac1` | Construction READY et CI automatisée réussie ; ressources du commit et appareils physiques non recontrôlés |
| Niko Emploi | `3f324a9f` | Construction READY, CI et 9 ressources publiques HTTP 200 (audit GitHub Actions `45058031630`) ; sources d'offres non certifiées |
| NikoAssist | `091cf598` | Construction READY, CI et 6 ressources HTTP 200 (audit GitHub Actions `45053587151`) ; moteur Python du site non connecté |
| Studio Niko Hub | `51ddd9ab` | Construction READY et CI ; aucune certification d'exécution sur appareils |

Les champs `verification: http_assets_only` et `verification: deployment_ready_ci_only` distinguent ces deux périmètres. Le tableau affiche la **date de relève** et rappelle que l'état n'est pas mis à jour en direct. Pour rafraîchir correctement les preuves : relever l'alias Vercel, son environnement `production`, le SHA et l'état `READY`, puis exécuter un audit HTTP indépendant si l'on veut revendiquer cette preuve. Le registre, la capture `repository-snapshot` et les contrôles de cohérence doivent rester concordants.

La vérification en navigateur de production, les interactions des moteurs métiers, l'installation PWA sur vrais appareils et les intégrations IA restent à documenter séparément. Aucun déploiement ou clic de démonstration ne prouve ces fonctions à lui seul.


## Correction P0 — lot 1 (25 novembre 2026)

- [agent-biometrique](https://github.com/Nikoju1977/agent-biometrique/commit/7d94d7666ac1ec8c98f4256d689639c49996688e) : Aperçu caméra facultatif, scores et alertes fictifs retirés du code. Aucune mesure biométrique ; cycle caméra à qualifier.
- [SCAN-BIOMEDICAL](https://github.com/Nikoju1977/SCAN-BIOMEDICAL/commit/416dce75f69b5d93d1bd49836a6e9f0c1844de4b) : Repères faciaux expérimentaux et EAR ; pouls et fatigue retirés. Aucun usage médical ; modèle, permissions et suivi à qualifier.
- [aylina-is-cooking](https://github.com/Nikoju1977/aylina-is-cooking/commit/c25e48bdf50a7f6b8eb6e9f7879b363a3d80e3e0) : Calcul alimentaire par portion et favoris locaux ; dose retirée, IA suspendue. Aucun calcul de traitement ; favoris non chiffrés, ancien profil effaçable volontairement.

Sources relues après publication, empreintes SHA vérifiées ; aucun nouveau test d'exécution ou déploiement vérifié. Les constats antérieurs sont historiques, non des preuves de l'état actuel. Le chef distant est suspendu par précaution ; pas de suppression automatique des anciennes données locales.

## NIKO 3D VIBES V3.1 — production (27 novembre 2026)

[Ouvrir l'application](https://niko-3d-vibes.vercel.app/) ; [CI réussie](https://github.com/Nikoju1977/Niko-3D-VIBES/actions/runs/45938450383) ; commit `6e000eabb716deddbc6fdd0606bb9184228db17d`. Vercel READY et alias associés au commit exact ; CI GitHub réussie, Chromium sur deux viewports (10 modes, OBJ, arrêt, diagnostic Core). Page publique lue sans authentification ; caméra réelle, MediaPipe, MIDI, Blender et appareils physiques non validés. Les huit relevés Vercel/GitHub sont datés du 27 novembre, 5 SHA alignés au moment du relevé. Les autres preuves historiques restent distinctes.
