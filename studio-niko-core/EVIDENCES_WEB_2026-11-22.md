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
