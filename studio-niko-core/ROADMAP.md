# Feuille de route Studio Niko — 55 dépôts

Date du lot : 22 novembre 2026. Ce document distingue les travaux **committés** des travaux **proposés**. Le [registre public](./registry.json) liste 50 dépôts publics ; les cinq dépôts privés ne sont pas publiés par le tableau de pilotage. Le total inventorié reste de 55.

## Phase A — Socle technique (code enregistré)

- [x] Source canonique `v0.1.0/core.js` dans ce dépôt principal.
- [x] Copies locales dans les six applications phares : META-STUDIO PRO, Thelovestronautes Machine, AutoCoder, Niko Emploi, Galerie Studio Niko et NikoAssist.
- [x] Chargement optionnel qui ne remplace ni moteur IA ni moteur métier.
- [x] Bouton « Diag. » dans les aides existantes, « Copier diagnostic » dans les réglages AutoCoder.
- [x] Diagnostic déclenché uniquement par clic et sans contenu sensible.
- [x] Utilitaires JSON et stockage local isolé **non utilisés pour les données médicales**.
- [x] Référence des ressources dans les PWA hors ligne (4 des six applications).
- [x] Registre public de 50 dépôts, avec nombre de dépôts privés sans leurs noms.
- [x] Tableau de pilotage HTML autonome dans `hub/pilotage.html`, recherche, filtres et liens documentés.
- [x] Rafraîchissement explicite de l'instantané via `tools/refresh-hub.mjs` ; pas de statut de santé simulé.
- [x] Correction du cache PWA Hub : chaque navigation a sa propre entrée, sans écraser l'accueil.
- [x] Galerie : module intégré à la source, au HTML publié et option d'incrustation dans la construction autonome.
- [x] Deuxième vague de migration : `AutoEntrepreneur-1M` et `oracle-du-jardinier`, soit huit dépôts publics avec copies du Core.
- [x] Suivi local par projet/version/module, anomalies, actions, références déclaratives, historique et import/export JSON dans `hub/pilotage.html`.
- [x] Script `sync-core.mjs` : détection des liens symboliques et copie atomique en mode explicite `--apply`.
- [x] Oracle du Jardinier : Service Worker `sw.js` servi depuis le site et manifeste statique, remplaçant l'inscription non valide depuis une URL Blob.

**Limites :** les imports/exports existants restent inchangés ; les utilitaires ne sont pas encore substitués à ces flux. Aucun test utilisateur, revue de sécurité exhaustive ou certification iPhone n'est revendiqué. Les deployments doivent être suivis séparément.

## Phase B — Rendre les six parcours principaux fiables

Le tableau de pilotage constitue une photographie de code ; il **ne confirme pas** que le rendu cinéma, audio, médical ou graphique fonctionne sur un appareil. Ces audits métier restent à conduire séparément et uniquement à la demande du propriétaire.

| Application | Fonction critique à fiabiliser | Livraison attendue |
|---|---|---|
| META-STUDIO PRO | Génération vidéo, quotas fournisseur, timeline et export | État réel du moteur, reprise après erreur, résultat produit ou erreur explicite |
| Thelovestronautes Machine | Échantillonnage, lecture sur iPhone, enregistrement | Aucun silence imprévu ; export WAV non vide, annulation et préservation du projet |
| AutoCoder | Éditeur, prévisualisation, Pyodide, API optionnelle | Erreurs visibles, code sauvegardé, mode hors-ligne expliqué |
| Niko Emploi | Sources d'offres autorisées, filtres et candidatures | Annonces sourcées, suivi fiable, aucun envoi non consenti |
| Galerie Studio Niko | Three.js, mode 2D, médias et sauvegardes | Fonctionnement sur navigateur dépourvu de WebGL, sauvegarde récupérable |
| NikoAssist | Permissions, orchestration et restitution | Afficher les actions réellement exécutées et demander confirmation des opérations sensibles |

### Avancement de la phase B — sauvegardes et exports (code GitHub)

- [x] `ia-studio-cine` : l'import JSON/ZIP valide les principaux champs avant de remplacer une timeline, demande une confirmation, et distingue les sources distantes des URL `blob:` expirées.
- [x] `ia-studio-cine` : le ZIP embarque un index de médias, un index audio et les sources récupérables des clips audio de la timeline ; les fichiers manquants sont indiqués dans `media-non-disponibles.txt`.
- [x] `ia-studio-cine` : lien manuel de téléchargement après un rendu ou un export asynchrone. [Procédure exacte](https://github.com/Nikoju1977/ia-studio-cine/blob/main/SAUVEGARDE_MEDIA.md).
- [x] `the-lovestronautes-machine` : confirmation avant import, sauvegarde de l'état précédent pour restauration après incident, message explicite sur les prises audio non incluses dans le JSON.
- [x] `the-lovestronautes-machine` : audit élémentaire des captures PCM (signal non nul, canaux stéréo cohérents) avant l'encodage WAV/MP3, et lien manuel après l'export. [Procédure exacte](https://github.com/Nikoju1977/the-lovestronautes-machine/blob/main/SAUVEGARDE_EXPORT.md).

**À faire :** mesurer et corriger l'intégrité des fichiers générés et la fidélité du montage/son sur appareils réels ; les changements ci-dessus sont **du code committé**, pas une validation des traitements ni une certification de compatibilité iOS.

## Phase C — Données sensibles et opérations

P0 : `fibrocare`, `fibrobot`, `jarvisdiabete`, `OPENVITA-DT1`, `Boutique-morgane` et `aegis-earth-mobile`. Prévoir une revue spécifique de chaque flux de données et permission ; ne jamais mutualiser indistinctement le stockage local pour les dossiers médicaux, les identifiants ou les paiements.

## Phase D — Extension progressive

Étendre uniquement les modules réellement pertinents aux autres dépôts de [registry.json](./registry.json), en commençant par musique, vidéo, création et jeux. Garder les projets autonomes lorsqu'un cœur commun n'apporte pas de bénéfice concret.

## Métriques à suivre (objectifs, non mesures)

- Aucun bouton cliquable sans effet ni explication.
- Aucune donnée fictive présentée comme donnée réelle.
- Import/export des projets récupérable et non destructif.
- Aucune transmission de clé ou de donnée personnelle à un service non autorisé.
- Séparer code committé / déploiement READY / comportement vérifié.
- Priorité aux interactions tactiles et à la consommation mémoire.

**Demande actuelle du propriétaire :** ne pas déclencher de campagnes de tests supplémentaires sans demande expresse. Les déploiements ne doivent jamais être confondus avec des essais réels.
