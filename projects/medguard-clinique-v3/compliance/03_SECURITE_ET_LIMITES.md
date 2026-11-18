# MEDGUARD CLINIQUE v2 — Sécurité réelle, risques résiduels et conditions d'accès

## Composants testables fournis

- CSP restrictive côté HTML et en en-têtes HTTP ; aucun script distant.
- Affichage de contenu non fiable via `textContent` (pas de `innerHTML` pour les textes saisis).
- Aucun `localStorage`, cookie applicatif, base de données ou télémétrie de contenu.
- Export par défaut des **seuls indicateurs agrégés** (nombre de phrases, statuts et alertes, pas le texte source, les noms ni les preuves).
- API locale avec secret obligatoire en variable d'environnement, `compare_digest`, filtrage d'hôte et d'origine web, vérification des en-têtes JSON, limite déclarée de taille de requête, `Cache-Control: no-store`.
- Script uvicorn sans access log par défaut, écoute sur `127.0.0.1` uniquement.
- PWA : fichiers statiques seulement dans le cache du service worker (désactiver sur des postes de santé si politique locale contraire).

## Risques **non** résolus

1. **Détection de données patient incomplète** : prénom, adresse, date de naissance ou autre identifiant peuvent ne pas être détectés. Ne jamais prétendre anonymiser du contenu.
2. **Données en mémoire** : extensions navigateur, appareil compromis, capture, presse-papiers et restauration de session sont hors du contrôle de l'application.
3. **Hébergement** : ce paquet ne comprend ni certification HDS, ni contrat d'hébergement, ni contrôle ISO 27001 audité, ni chiffrement au repos, ni IAM professionnel.
4. **API** : une clé secrète partagée et une restriction locale sont insuffisantes pour les accès multiutilisateurs réels. Le contrôle de longueur par `Content-Length` ne doit pas être assimilé à une limitation de flux résistante à tous les attaquants.
5. **Médecine** : pas d'authentification des sources, pas de calcul de dosage fiable, pas de règles de contre-indication, pas de validation clinique ni de signature qualifiée de professionnel.
6. **Logs d'infrastructure** : un serveur frontal, un navigateur, un proxy ou un hébergeur tiers pourraient créer d'autres journaux ; politique à définir avant hébergement.
7. **Export technique** : des agrégats peuvent être sensibles dans un contexte rare ; éviter de joindre le bilan à une identité patient et appliquer minimisation/protection.

## Conditions avant production

- Architecturer des composants stateless, durcir les flux, authentifier les professionnels, autoriser par rôle, gérer les incidents, chiffrer les échanges et les données persistantes.
- Faire réaliser des tests de vulnérabilité et un audit indépendant, analyse des dépendances, revue de code, supervision de disponibilité et tests de charge.
- Exécuter la qualification MDR selon finalité et la vérification HDS en cas de traitement/ hébergement externe de données de santé au champ de la législation.
- Consigner les preuves de validation clinique et les résultats sur un environnement approuvé, sans cas patient réel avant autorisation appropriée.
