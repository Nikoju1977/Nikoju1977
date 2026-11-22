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
