# Studio Niko Design — registre de provenance

Le registre du 24 novembre 2026 référence 51 dépôts publics non-forks. Il ne revendique pas les droits des tiers et ne remplace pas les licences existantes. Les identifiants Git désignent des instantanés précis; ils ne sont ni une signature personnelle ni un horodatage indépendant.

## Vérification gratuite

Depuis un clone du dépôt, exécuter `python3 provenance/verify.py --self-test` pour contrôler l'empreinte du registre et `python3 provenance/verify.py --self-test --online` pour comparer les métadonnées publiques actuelles aux références historiques. Aucun jeton ni dépendance Python externe n'est requis. Un changement est une alerte à examiner, pas une preuve de contrefaçon. Une indisponibilité réseau ne prouve pas une suppression.

Le workflow Studio Niko provenance audit effectue ces contrôles en lecture seule lors d'une modification des fichiers de provenance, chaque mardi à 07:23 UTC, ou manuellement via Actions. Les exécutions programmées peuvent être désactivées par GitHub, notamment en cas d'inactivité. Consulter les journaux pour confirmer les exécutions.

## Horodatage indépendant gratuit

Télécharger la version figée du registre : https://github.com/Nikoju1977/Nikoju1977/blob/f512089ca9fca53202849948a7680a67076186d1/provenance/registry-2026-11-24.json

Vérifier le SHA-256 de ses octets : d9f86b6a6120fc6deefa68e8705ae9f602872c457e75ad6e8c502258ee9d8034.

Sur https://opentimestamps.org/, horodater le fichier téléchargé et conserver le fichier .ots avec l'original, sur un support indépendant de GitHub. Mettre à niveau la preuve après confirmation Bitcoin et vérifier celle-ci. Un reçu en attente n'est pas encore une preuve ancrée. Aucun horodatage externe ni signature personnelle n'est revendiqué ici tant que les preuves n'ont pas été effectivement obtenues et vérifiées.

Conserver aussi une copie locale des versions sources pertinentes (avec historique Git) et de l'empreinte. Ne jamais publier de clé de signature privée. Pour chaque nouvelle version importante, créer un nouvel instantané daté sans écraser les précédents.

Le registre et les métadonnées sont modifiables sur GitHub. Un ancrage externe et une signature détenue par le créateur renforcent leur vérifiabilité, sans empêcher la copie du code public.
