# MEDGUARD CLINIQUE V3 — Rapport technique 18 novembre 2026

| Vérification | Résultat |
| --- | --- |
| 35 tests Python (moteur v2, provenance v3, API FastAPI) | Réussis localement |
| 10 tests JavaScript (moteur navigateur) | Réussis localement |
| `node --check` sur `web/app.js` et `web/engine.js` | Réussi |
| Reconstruction de l'HTML autonome | Réussie (49 138 octets avant ajouts de documentation) |
| Registre v3 vide | Bloque toutes les requêtes (testé) |
| Source inscrite avec SHA correct et dates valides | HUMAN_REVIEW, jamais APPPROVED (testé synthétiquement) |
| Référence expirée, non approuvée, falsifiée, dupliquée | Bloquée (tests synthétiques) |
| Injection triviale dans source / réponse | Bloquée pour motifs connus uniquement |
| Clé absente/invalide, origine interdite, schéma invalide | Refus (tests automatisés) |
| Audit clinique externe / essais patients | **Non faits** |
| Tests mobiles, charge, pentest indépendant, accessibilité détaillée | **Non faits** |
| Réglementation CE / RGPD / HDS | **Aucune certification ni conformité démontrée** |

**Ceci n'est pas une évaluation de performance clinique.** Les essais sont à partir de phrases de fiction, sans diversité réelle de cas patients ni validation statistique. Aucune comparaison indépendante avec un autre logiciel n'a été menée.
