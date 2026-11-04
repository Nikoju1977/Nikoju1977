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
