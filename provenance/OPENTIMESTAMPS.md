# Horodatage OpenTimestamps — Studio Niko Design

Le workflow [Studio Niko OpenTimestamps](../.github/workflows/studio-niko-ots.yml) utilise uniquement un registre public préexistant, sa référence Git exacte et son SHA-256 attendu. Il ne traite pas les dépôts privés ni les forks exclus du registre. Il ne publie pas les fichiers sources auprès des calendriers, seulement des engagements cryptographiques. Aucun portefeuille Bitcoin n'est configuré.

## Premier registre

- Fichier : registry-2026-11-24.json
- Commit de référence : f512089ca9fca53202849948a7680a67076186d1
- SHA-256 : d9f86b6a6120fc6deefa68e8705ae9f602872c457e75ad6e8c502258ee9d8034
- Reçu : timestamps/registry-2026-11-24.json.d9f86b6a6120fc6deefa68e8705ae9f602872c457e75ad6e8c502258ee9d8034.ots.base64 (créé après réussite du workflow)

## Statuts

- pending : reçu de calendrier, confirmation Bitcoin en attente.
- bitcoin-attestation-present-not-independently-verified : le reçu contient une attestation de bloc, mais celle-ci doit encore être vérifiée indépendamment.
- échec : consulter les journaux; ne pas considérer l'horodatage comme réussi.

La mise à niveau quotidienne porte sur le premier registre. Pour les futurs registres datés, lancer manuellement le workflow depuis main avec les trois paramètres exacts (nom du registre, commit, SHA-256), puis relancer avec les mêmes paramètres pour mettre à niveau leur preuve. Les fichiers de preuve sont séparés par empreinte afin de ne pas confondre les versions.

## Conservation et vérification indépendante

Télécharger le registre au commit exact et le fichier .ots.base64 associé. Décoder Base64 vers registry-2026-11-24.json.ots (sous Linux : base64 -d fichier.ots.base64 > registry-2026-11-24.json.ots ; sous Windows PowerShell : [IO.File]::WriteAllBytes("registry-2026-11-24.json.ots", [Convert]::FromBase64String((Get-Content -Raw "fichier.ots.base64")))). Conserver les deux fichiers hors de GitHub, sur un support personnel.

Utiliser le vérificateur https://opentimestamps.org/ ou le client officiel avec un nœud Bitcoin de confiance. La présence d'une attestation ne constitue pas à elle seule une validation de la chaîne. L'horodatage démontre l'existence d'une empreinte au plus tard à une date donnée, pas l'identité du créateur ou l'exclusivité des droits. Les licences antérieures restent applicables.

L'exécution est prévue quotidiennement à 06:17 UTC sur un runner standard public. GitHub peut suspendre les tâches programmées, notamment en cas d'inactivité. Aucun service payant n'est configuré.
