# Plan d'intégration — projets phares

## Six applications prioritaires

- `ia-studio-cine` — préservation de la timeline, des médias et des APIs IA ; script facultatif chargé par le HTML.
- `the-lovestronautes-machine` — jamais de traitement dans `AudioWorklet` ou l'horloge Web Audio ; script d'aide hors du chemin audio.
- `AutoCoder-Studio-Niko` — respecter la CSP stricte et ne pas lire les fichiers de l'éditeur ni les jetons d'accès.
- `job-search` — aucune lecture du CV, de l'historique des candidatures ou des paramètres d'accès.
- `galerie-studio-niko` — modifier `src/galerie.html` (source), garder la cohérence du fichier généré `index.html` et du mode autonome.
- `Nikoassist` — intégrer dans `web/`, jamais dans le runtime Python/nanomuse ; aucun accès aux conversations.

## Étapes de migration

1. Livrer le script partagé v0.1.0 en copie locale.
2. Brancher un bouton de diagnostic discret uniquement dans un panneau déjà prévu pour l'aide ou les réglages.
3. Conserver les fonctions propres aux applications, leurs sauvegardes et leurs permissions.
4. Réviser progressivement les flux de données : erreurs réseau, stockage, sauvegardes, import/export, annulation.
5. Documenter pour chaque app le moteur réellement utilisable, la source des résultats, les limites et les états de déploiement.
6. Pour les projets de santé et de commerce : examiner séparément chiffrement, conformité et consentement avant tout partage d'utilitaires de stockage.

## Hors périmètre de v0.1.0

Pas de changement de schéma de données, de bibliothèques d'IA, de configuration serveur, d'envoi de télémétrie, d'automatisation de recrutement, de contrôle TikTok ou d'acte médical. Le diagnostic n'est pas une preuve que l'application fonctionne.

## Publication

Le déploiement Vercel est soumis aux quotas du compte. Ne pas interpréter un commit sur `main` comme une mise en production et ne pas inventer des preuves d'essais.
