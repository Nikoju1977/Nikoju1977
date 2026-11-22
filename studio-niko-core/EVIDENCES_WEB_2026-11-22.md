# Vérifications HTTP Studio Niko — 22 novembre 2026

## Portée et méthode

Contrôles de lecture sur les adresses Vercel du propriétaire, via une requête HTTP GET depuis le connecteur Vercel. La date est le **22 novembre 2026** (Europe/Paris). Les résultats démontrent seulement la réponse des routes HTTP à cet instant ; ils **ne prouvent pas** le fonctionnement JavaScript, Web Audio, Pyodide, les intégrations tierces, les exports, la compatibilité mobile ni la stabilité sur appareil réel.

| Projet | Route contrôlée | Réponse | Conclusion limitée |
| --- | --- | --- | --- |
| Studio Niko Hub, production | https://studio-niko-hub.vercel.app/ | 200 | Page HTML publiée |
| Studio Niko Hub, production | https://studio-niko-hub.vercel.app/pilotage.html | 200 | Tableau HTML publié ; version antérieure à la préproduction |
| Studio Niko Hub, préproduction `77edf954` | https://studio-niko-ev1fsrfco-nikoju1977s-projects.vercel.app/pilotage.html | 200 | Nouveau tableau HTML accessible |
| AutoCoder, production | https://autocoder-studio-niko.vercel.app/ | 200 | Interface HTML publiée |
| AutoCoder, production | https://autocoder-studio-niko.vercel.app/api/status | 200 | Réponse JSON `{"configured":false,"mode":"local-only"}` : **IA serveur non configurée** |
| Niko Emploi, production | https://niko-emploi.vercel.app/ | 200 | Interface HTML publiée |
| Niko Emploi, production | https://niko-emploi.vercel.app/marche-cache.html | 200 | Interface du radar accessible |
| Niko Emploi, production | https://niko-emploi.vercel.app/candidatures.html | 200 | Interface candidature accessible |
| NikoAssist, production | https://nikoassist-pwa.vercel.app/ | 200 | Interface HTML publiée |
| NikoAssist, production | https://nikoassist-pwa.vercel.app/manifest.webmanifest | 200 | Manifeste PWA accessible |

## Déploiements de préproduction Vercel

Les constructions `READY` sont visibles dans les enregistrements Vercel : AutoCoder `8e959322`, Niko Emploi `48fd0890`, NikoAssist `d8b9f7ba` et Hub `77edf954`. Cela valide l'étape **construction**, pas les fonctions métier. Pour le Hub, les **sept fichiers modifiés** entre la branche `improve/deployment-evidence-2026-11-22` et `main` ont été lus depuis GitHub et sont identiques octet pour octet ; la différence d'historique ne signifie pas une différence de ces fichiers.

## Blocage de production du Hub

L'alias public `studio-niko-hub.vercel.app` pointe encore sur le déploiement de production `dpl_DdBZNJR379ZCDYrdXjugJ8RjUV5y` (commit `d62f1ea6`). La nouvelle préproduction `dpl_ELbNG5HgYZsfXnaeQFzGiV5HN8VW` est `READY`, mais une demande de promotion via l'API Vercel `POST /v10/projects/{projectId}/promote/{deploymentId}` a été **refusée en HTTP 422**, le 22 novembre 2026. Aucune promotion, modification d'alias, nouvelle compilation ni mise en ligne de cette version n'a été effectuée à la suite de ce refus.

**Attention aux chemins :** le Hub est déployé depuis son répertoire `hub/`. L'URL publique correcte est `/pilotage.html`, pas `/hub/pilotage.html` (404 attendu pour cette dernière). Ne pas signaler ce 404 comme un défaut de la page correcte.

## Prochaines étapes distinctes

1. Résoudre le refus de promotion Vercel ou attendre la capacité de déploiement, puis vérifier quelle révision sert réellement `/pilotage.html` sur le domaine public.
2. Contrôler le chargement de Pyodide et la sauvegarde/reprise d'AutoCoder sur appareils.
3. Vérifier une vraie recherche d'offres et un export de candidature Niko Emploi, sans envoyer de candidature.
4. Vérifier les actions permises de NikoAssist et sa PWA sur PC, Android, iPhone, Mac et tablette.
5. Conserver séparément **codé**, **build READY**, **page HTTP accessible**, **fonction testé**, **stable**.

Aucun test manuel sur appareil physique n'a été réalisé lors de ce relevé.

## Signal d'erreurs d'exécution Vercel (fenêtre de 24 h)

Le relevé Vercel du 22 novembre 2026 ne renvoie **aucun regroupement d'erreurs d'exécution** pour `studio-niko-hub`, `autocoder-studio-niko`, `niko-emploi` et `nikoassist-pwa` sur la fenêtre interrogée. Ce résultat peut aussi refléter l'absence de trafic ou des erreurs exclusivement côté navigateur ; il **ne prouve pas zéro bug**. Les tests réels de parcours, exports et appareils restent nécessaires.

## Mise à jour : production Hub et recherche Niko Emploi

Contrôle ultérieur du **22 novembre 2026**, après la rédaction du relevé initial. Il prime sur les mentions d'état de production antérieures dans ce même journal.

- **Hub : production désormais déployée**. Vercel a construit automatiquement le commit GitHub `352e1e44aaac89eab93deed44e4c7189cb5e3767` sous l'identifiant `dpl_7TDHd5yBkWoezExyYaWdkYndx7WT` (`target=production`, `READY`). Les alias `studio-niko-hub.vercel.app` et `studio-niko-hub-nikoju1977s-projects.vercel.app` pointent sur ce déploiement. `GET https://studio-niko-hub.vercel.app/pilotage.html` répond **200** et le HTML contient bien les marqueurs de registre et de preuves de préproduction (`repository-snapshot`, `preview_deployment`, commit `8e959322`, phase B). Cela confirme la publication du **contenu HTML**, pas ses parcours interactifs sur appareils. L'échec 422 de promotion de la préversion est un blocage historique désormais contourné par le déploiement Git automatique, sans affirmer qu'une promotion a réussi.
- **Niko Emploi : vrai endpoint** `GET /api/jobs` (et non `/api/offres`). Requête ciblée `?q=agent%20entretien&location=Nantes` : HTTP 200, **0 offre correspondante** après filtrage, **127 offres collectées en amont**, `partial:true`; EasyJobs répond **403 access_denied**, Jobicy 33 reçues, Arbeitnow 52, Himalayas 0, Greenhouse 42. Le contrôle n'établit **pas** qu'il n'existe aucune offre à Nantes : seuls ces fournisseurs et leurs limites sont couverts.
- **Radar Niko Emploi** `GET /api/hidden-market?q=Nantes` : HTTP 200 avec **20 entreprises** dans la réponse. La consultation d'entreprises ne constitue pas une preuve d'offre d'emploi ni de recrutement.
- **Options du service Niko Emploi** : `GET /api/config` répond 200, `aiConfigured:false`, `gmailConfigured:false`. Aucun envoi Gmail ni génération IA payante ne doit être présenté comme actif.
- **Correction UX de recherche** enregistrée sur GitHub : commit `e57f781f` (explication de la couverture et action pour élargir la recherche) puis `b1049189` (mise en forme responsive). Les deux exécutions GitHub Actions `44999619877` et `44999630764` ont fini en **success**. La réponse HTTP de `/app.js` en production **ne contient pas encore** les nouveaux marqueurs `search-coverage` et `widenSearch` : **non déployé**. Le statut de commit Vercel renvoie une erreur `upgradeToPro=build-rate-limit` (limite de builds du plan Hobby). Ne pas facturer ni activer un forfait payant automatiquement ; attendre la reprise de capacité ou un déploiement gratuit autorisé, puis vérifier la révision servie.

### Statuts après cette mise à jour

| Projet | Code GitHub | Construction / déploiement | Vérification réelle |
| --- | --- | --- | --- |
| Studio Niko Hub | Modifications du tableau committées | **Production READY** ; `/pilotage.html` HTTP 200 avec nouvelles données | Affichage HTML vérifié ; interaction/PWA/appareils non vérifiés |
| Niko Emploi | Correction UX `b1049189`, CI réussite | **Production encore ancienne**, publication bloquée par quota Vercel | API `/api/jobs` 200 mais partielle, EasyJobs 403 ; ergonomie modifiée non vérifiée en production |
| AutoCoder | Code existant | Production accessible HTTP 200 | Mode `local-only` confirmé par API ; Pyodide/export non vérifiés |
| NikoAssist | Code existant | Production accessible HTTP 200 | Réponse HTTP seulement ; moteur original non connecté selon l'interface |


## Mise à jour finale du lot — production HTTP et CI du 22 novembre 2026

Cette section chronologiquement postérieure annule les anciennes mentions « non déployé » ou « quota bloquant » situées plus haut dans le journal. Les déploiements automatiques Git/Vercel ont finalement abouti. Les contrôles ci-dessous constituent des **preuves limitées de publication**, pas une certification métier ou mobile.

| Projet | Déploiement READY en production | Ressources contrôlées | Limites |
| --- | --- | --- | --- |
| Studio Niko Hub | `dpl_7TDHd5yBkWoezExyYaWdkYndx7WT` · commit `352e1e44` | `/pilotage.html` HTTP 200, registre et Phase B présents | Ce commit précède la présente mise à jour du registre ; sa nouvelle publication est à recontrôler |
| AutoCoder | `dpl_HJUv8T93uMxder6zCH8ci279Zu1p` · `f906e3bc` | `/sw.js` version `v2.3.1-offline-fallback`, `/py-worker.js` purge des modules ; HTTP 200 | Tests CI réussis ; Pyodide et imports sur appareils réels non validés |
| Niko Emploi | `dpl_BDbL83LCdNZLURvAEW9mPo8RRVsj` · `3f324a9f` | `/app.js` : `search-coverage`, `widenSearch`, `officialSearch` ; `/styles.css` tactile ; HTTP 200 | Parcours Chromium CI réussi, mais sources externes partielles, EasyJobs 403 |
| NikoAssist | `dpl_83kBNJPtWkn2dAkJcqret4XkpVYH` · `07cca853` | `/`, `/app.js`, `/tasks-backup.js`, `/sw.js` et `/api/health` : HTTP 200 ; guide 44px et restauration JSON visibles | CI de sauvegarde Node/Python réussie ; `pythonEngineConnected:false`, appareils physiques non testés |

**Portabilité des tâches NikoAssist :** parser strict `nikoassist-tasks-v1`, sauvegarde de 256 Ko maximum, 200 tâches, doublons ignorés et aucune suppression des tâches existantes. La restauration est déclenchée par l'utilisateur avec validation et confirmation ; aucun mécanisme de synchronisation ni import de données sensibles à distance n'est présenté comme actif.


## Deux nouvelles applications publiées, contrôles du 22 novembre 2026

- **Niko Live Commander** : dernier déploiement Vercel `dpl_53kM99jjcUZjzVBDj39fPXHXeaVR` (`production READY`) à la révision `260ee5c8c63408e510a8db3a4a1e106c24a48bbd`. `GET /` et `GET /backup.js` renvoient HTTP 200. Fichier JavaScript public contient le validateur du JSON et la logique de confirmation. Le job Chromium CI `45033208120` a réussi une restauration JSON confirmée, la protection en cas d'annulation, le rejet d'un mauvais fichier et l'ergonomie d'un viewport 390 px. Ce projet ne pilote pas les appareils ni TikTok.
- **Rave Generator 2** : dernier déploiement Vercel `dpl_GJn1KnjVq4aRHWeeGsHSCq1gVodS` (`production READY`) à la révision `38d64b0920e07fb5a8f6ae34df5505c9137a710d`. `GET /` et `GET /sw.js` renvoient HTTP 200 ; le SW utilise `rave-generator-2-wav-v3-safe-import`. Test `45033560298` réussi en Chromium : fichier WAV de **1 355 804 octets**, RIFF/WAVE/PCM **stéréo 44 100 Hz 16 bits**, valeurs non nulles sur 2 398 points échantillonnés dans le fichier, pic PCM 16 689. Confirmation de remplacement d'un projet testée. Les essais de l'export réel dans Safari iPhone et le partage de fichiers n'ont pas été réalisés.
- **Distinction cruciale** : réponse HTTP 200 du domaine public = ressources servies. Tests Chromium sur une révision de code = fonctionnalités vérifiées dans cet environnement de CI. Ces deux preuves ne certifient pas les performances ou le fonctionnement sur un appareil physique.


## PWA Thelovestronautes Machine — correctif v28 du 22 novembre 2026

- Source `af2021bfe568475e10770b8f2a939af7de6e6e76` : origine vérifiée avant toute navigation capturée par le service worker, ressources JS/CSS hors ligne non substituées par une page HTML, mise en cache uniquement des réponses HTTP réussies avec `event.waitUntil`.
- Source `e672eb3dc830eec48ed9cccd52d324df3697c54d` : correction des assertions de version de cache dans six scripts existants afin de ne pas confondre nom historique V25 et état de la PWA V28.
- [Déploiement GitHub Pages](https://github.com/Nikoju1977/the-lovestronautes-machine/actions/runs/45034342109) et [pages build](https://github.com/Nikoju1977/the-lovestronautes-machine/actions/runs/45034342058) : workflows réussis pour le dernier commit.
- [Validation des parcours](https://github.com/Nikoju1977/the-lovestronautes-machine/actions/runs/45034342072) : contrôles statiques et régressions mobiles/Chromium réussis lors de ce relevé ; résultat global non encore conclu, vérification WebKit distincte en cours.
- La tentative de lecture HTTP du domaine GitHub Pages n'a pas abouti depuis les outils de consultation ; n'inférer aucune réponse HTTP 200, ni lecture sur haut-parleur d'iPhone/Android. Les erreurs réseau et les limitations audio restent documentées.
