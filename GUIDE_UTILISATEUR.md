# Mode d'emploi — Studio Niko Design (Hub et portfolio)

Le dépôt de profil contient les sources du portail public Studio Niko Hub, accessible sur [studio-niko-hub.vercel.app](https://studio-niko-hub.vercel.app/).

## Utiliser Studio Niko Hub

1. Ouvrir le portail HTTPS et choisir un univers (cinéma, musique, art, IA, etc.).
2. Utiliser la recherche, le filtrage et les favoris pour retrouver une application.
3. Cliquer sur **? Mode d'emploi** dans la fiche choisie pour lire les instructions et limitations spécifiques.
4. Cliquer sur **Lancer** uniquement si un accès est publié. Un lien accessible ne prouve pas que tous les services fonctionnent.
5. Dans **Atelier**, créer un projet et des tâches, les enregistrer localement ou exporter un JSON.
6. Utiliser le bouton **Installer la PWA** pour demander l'installation depuis le navigateur ; sur iPhone, utiliser Safari → Partager → Sur l'écran d'accueil.

## Dépannage

Les PWA conservent certains fichiers hors ligne après leur première visite. Les données externes, modèles IA distants et services nécessitent Internet. Les dépôts privés ne figurent jamais dans le catalogue public.

## Pour les développeurs

Le code est dans le dossier hub/. La commande node hub/check.cjs valide le catalogue et plusieurs invariants DOM/PWA. Les tests de disponibilité ne remplacent pas des tests de bout en bout de chaque application.

[Hub public](https://studio-niko-hub.vercel.app/) · [Code et documentation](https://github.com/Nikoju1977/Nikoju1977/tree/main/hub)
