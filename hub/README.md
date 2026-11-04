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
