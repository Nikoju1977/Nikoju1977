# Studio Niko Hub

Portail public de **Studio Niko Design** — catalogue des dépôts publics, recherche, univers, favoris locaux, accès RON et PWA.

## Principe

- Source : dépôt GitHub \`Nikoju1977/Nikoju1977\`, répertoire \`hub/\`.
- **Aucun dépôt privé, jeton ou code sensible** n'est exposé.
- \`catalog.json\` est généré à partir de la liste des dépôts publics accessibles le 4 novembre 2026 (actualisation ultérieure explicite).
- Un lien \`demoUrl\` signale **une adresse annoncée par la documentation**, pas un test de disponibilité ni une garantie de fonctionnement.
- La rubrique RON est un **lancement vers l'application existante**, pas une intégration de son runtime IA.
- N8V est présent comme **projet en préparation** parce que son dépôt est vide.
- Les favoris sont purement locaux au navigateur. Aucun compte ni suivi n'est activé.
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
