# NIKO Precision Core — module partagé expérimental

Version candidate 1.1.0. Copie exacte du module de Niko 3D VIBES à l'identifiant de commit indiqué dans release.json, avec extension .mjs pour garantir le chargement ESM. Les deux fichiers de tests sont adaptés uniquement sur le chemin d'import. Ne modifie pas Studio Niko Core 0.1.0, les registres d'intégration ni les applications existantes.

## Vérification locale (Node.js 22)
```sh
node studio-niko-core/precision/v1.1.0/verify.mjs
node --test studio-niko-core/precision/v1.1.0/*.test.mjs
```
Le premier contrôle compare le blob Git de la copie aux octets de la source validée et calcule SHA-256. Ces empreintes ne sont pas des signatures. La CI n'utilise aucun secret, jeu de données patient ou modèle distant.

## Intégration future
Copier localement le module exact, le manifeste et les notices; vérifier le blob, importer seulement les fonctions utiles, adapter les unités et schémas au mesurande validé, ajouter des tests d'intégration, définir une stratégie de chiffrement et de gestion de clé par application. Ne jamais substituer une calibration synthétique à une mesure traçable. Les algorithmes actuels sont limités aux angles et cadences, les budgets supposent des contributions indépendantes. Les exports de session chiffrés ne protègent pas un navigateur compromis.

Toute utilisation médicale exige une destination définie, gestion des risques, validation métrologique et clinique, analyse réglementaire et audit de sécurité appropriés. Aucune activation automatique, aucune certification, aucune modification des applications médicales. Voir PRECISION-CORE.md et notices originales.
