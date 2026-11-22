# Feuille de route Studio Niko — 55 dépôts

Date du lot : 22 novembre 2026. Ce document distingue les travaux **committés** des travaux **proposés**. Le [registre public](./registry.json) liste 50 dépôts publics ; les cinq dépôts privés ne sont pas publiés par le tableau de pilotage. Le total inventorié reste de 55.

## Relevé HTTP public du 22 novembre 2026

[Consulter le journal des réponses HTTP, des commits et des blocages Vercel](EVIDENCES_WEB_2026-11-22.md).

Les pages du Hub, d'AutoCoder, de Niko Emploi et de NikoAssist sont accessibles sur les routes vérifiées (HTTP 200), mais cette preuve est limitée à la **présence de la réponse HTTP**. L'API d'AutoCoder indique le mode `local-only`. La promotion manuelle initiale du Hub avait été refusée (HTTP 422), mais un **déploiement Git automatique a ensuite publié le tableau**. Le nouveau lot du 22 novembre confirme aussi la production HTTP de Niko Emploi, AutoCoder et NikoAssist, sans en déduire la stabilité des fonctions sur appareil. Les essais fonctionnels sur appareils restent ouverts.

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

**Limites du socle v0.1.0 :** ce composant ne substitue aucun import/export métier ; les modifications ultérieures des flux sont documentées séparément en phase B. Aucun test utilisateur, revue de sécurité exhaustive ou certification iPhone n'est revendiqué. Les deployments doivent être suivis séparément.

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

### Récupération après interruption (code GitHub, état distinct du déploiement)

- [x] `ia-studio-cine` : ajout de deux générations locales de description de projet, checkpoint différé lors des changements et de la suspension de page, copie avant rendus coûteux / import / reset, boutons de restauration volontaire, export et effacement du secours. Le matériel vidéo/audio **n'est pas** inclus dans les snapshots.
- [x] `the-lovestronautes-machine` : rotation d'une sauvegarde précédente en stockage navigateur, conservation des modifications différées avant suspension, rétablissement de secours en cas d'état courant illisible et panneau discret de restauration/export de l'état précédent.
- [x] Mises à jour des références de version du navigateur et du cache PWA audio ; documentation des limites de quota, confidentialité, médias externes et stockage Safari.
- [ ] Vérifier après publication la restauration sur PC, Android, iPhone, Mac et tablette, sans considérer un commit comme une preuve de fonctionnement.

**Limites :** les états de secours sont enregistrés localement et en clair ; un navigateur peut les purger. Les clips et enregistrements importés ne se retrouvent pas automatiquement par magie. Aucune campagne de tests physiques n'a été lancée à cette étape.

### Lot B2 — Fiabilisation AutoCoder et Niko Emploi (commits du 22 novembre 2026)

| Application | Changement réellement committé | Limite ouverte |
|---|---|---|
| **AutoCoder** | Copie locale précédente des fichiers de code, restauration volontaire, export de secours JSON, liens de téléchargement prolongés, enregistrement des modifications en attente lors de la mise en arrière-plan | Pyodide via CDN et prévisualisation à contrôler séparément sur mobile ; sauvegarde navigateur et quota non garantis |
| **Niko Emploi** | Correction d'échappement du calendrier ICS et validation de dates, téléchargement manuel CSV/JSON/ICS, cache du shell public du radar avec accès aux suivis locaux hors connexion | Aucune recherche d'offres ou d'entreprises hors ligne ; conformité des sources, suivi des candidatures et intégrations réelles encore à évaluer |
| **Galerie Studio Niko** | Aucun nouveau correctif de ce lot ; mode 2D sans WebGL déjà présent dans le dépôt | Cohérence source/généré, conservation des médias et navigation tactile à reprendre |
| **NikoAssist** | Aucun nouveau correctif de ce lot | Revoir permissions, confirmation d'opérations réelles et affichage des actions effectivement exécutées |

- [x] Code et interface de reprise d'AutoCoder enregistrés. [Limites et procédure](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/blob/main/docs/RECUPERATION_PROJET.md).
- [x] Code ICS, téléchargement et coque radar PWA de Niko Emploi enregistrés. [Documentation et limites](https://github.com/Nikoju1977/job-search/blob/main/docs/RADAR_LBB_INTEGRATION.md).
- [x] Registre public et tableau Hub complétés avec les six états **phase B** distincts des statuts de publication et de fonctionnement.
- [ ] Contrôler les commits en production, les intégrations et les comportements sur appareils réels **uniquement sur demande expresse**.

### Ordre opérationnel restant — sans mélanger les projets

1. **P0 — Fiabiliser Galerie Studio Niko :** remettre en cohérence les entrées HTML 3D/2D, l'interface tactile et la récupération des médias. Ne pas affirmer que WebGL fonctionne sans preuve de navigateur réel.
2. **P0 — Renforcer NikoAssist :** chaque action potentiellement sensible doit disposer d'une autorisation explicite, d'une explication et d'un retour d'exécution honnête. Ne pas afficher un succès lorsqu'aucune action n'a été réalisée.
3. **P0 — Continuer Niko Emploi :** préserver les candidatures sans inventer leur envoi, distinguer preuves de réception, liens externes et états manuels ; examiner la licéité et la fiabilité des sources.
4. **P0 — Continuer AutoCoder :** rendre les erreurs Pyodide, Worker, chargement CDN et prévisualisation explicites sans simuler une exécution ni promettre Python hors connexion.
5. **P0 — Cinéma et audio :** poursuivre la réconciliation des médias et le diagnostic d'erreurs réels, sans attribuer au navigateur un rendu 4K ou un export stéréo garanti.
6. **Transversal — Confidentialité :** un ancien commit public du registre a contenu des noms privés ; la version actuelle n'en contient plus, mais le nettoyage d'historique est un chantier distinct, potentiellement destructif et soumis à autorisation préalable.

**Règle de preuve :** « défini » ≠ « committé » ≠ « déployé » ≠ « vérifié sur appareil » ≠ « stable ». Aucun jalon de tests ni de déploiement n'est coché automatiquement.

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

## Lot du 22 novembre 2026 — preuves de construction Vercel

Les quatre aperçus AutoCoder (`8e959322`), Niko Emploi (`48fd0890`), NikoAssist (`d8b9f7ba`) et Studio Niko Hub (`27ec7656`) ont été construits en **READY** sur Vercel. Les URLs, projets, environnements et SHAs sont inscrits dans `registry.json`, sans assimiler ce résultat à une exécution testée.

À effectuer avant toute déclaration « stable » : ouverture et navigation sur les appareils ciblés, absence de blocage console, import/export d'un véritable projet, vérification des permissions et dépendances, retour arrière testé, journal des résultats lié à la version exacte. La vérification navigateur automatisée externe a été bloquée par une limite de crédit ; aucun résultat de navigation n'est inventé.


## Lot B3 — Déploiements de production confirmés et sauvegardes NikoAssist (22 novembre 2026)

Les résultats actualisés sont inscrits dans le [journal de preuves](EVIDENCES_WEB_2026-11-22.md) et dans `registry.json` sous `production_deployment`, avec `verification: http_assets_only`. Les aperçus antérieurs restent conservés comme historique ; ils ne remplacent pas les preuves de production.

| Projet | Source/CI | Vercel production | Restant à vérifier |
| --- | --- | --- | --- |
| Studio Niko Hub | Tableau et snapshot synchronisés dans ce lot | Ancienne production HTTP 200 ; nouvelle publication à vérifier après commit | Navigation, PWA et interaction sur appareils |
| AutoCoder | `f906e3bc` ; tests Python/Pyodide et navigateur CI réussis | `READY`, `/sw.js` et `/py-worker.js` vérifiés | Pyodide et sauvegardes sur appareils physiques |
| Niko Emploi | `3f324a9f` ; tests Chromium CI réussis | `READY`, nouveaux `/app.js` et `/styles.css` vérifiés | Sources d'emplois encore partielles, EasyJobs HTTP 403 ; suivi réel |
| NikoAssist | `07cca853` ; tests Python, Web et sauvegardes CI réussis | `READY`, import/export, aide mobile, `/api/health` vérifiés par HTTP | Import réel de fichier sur iPhone/Android, moteur Python non connecté |

Aucun essai sur un téléphone physique n'est revendiqué. Le registre donne les commits et URLs consultés et ne se met pas à jour en temps réel sans nouveau relevé.
