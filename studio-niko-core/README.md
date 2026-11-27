# Studio Niko Core — socle partagé (v0.1.0)

Source canonique dans le dépôt [Nikoju1977/Nikoju1977](https://github.com/Nikoju1977/Nikoju1977/tree/main/studio-niko-core). La connexion GitHub disponible permet la création de fichiers mais pas encore la création d'un nouveau dépôt : **ce dossier est donc la source principale provisoire** et non un dépôt indépendant.

## Objectif

Faire évoluer les applications Studio Niko sans répliquer des corrections non maîtrisées : utilitaires légers, résilience, aide technique et contrat de publication. Le socle n'ajoute ni moteur IA, ni caméra, ni service payant, ni télémétrie.

## Inclus dans v0.1.0

`v0.1.0/core.js` expose `window.StudioNikoCore` :

- `version` — version explicite, sans publicité de capacités inexistantes ;
- `storage(namespace).read/write/remove` — stockage local par espace de nom, avec erreurs gérées ; **ne pas utiliser directement pour des données médicales ou des secrets** ;
- `exportJSON(value, filename)` — téléchargement local sur action explicite ;
- `importJSON(file, {maxBytes, validate})` — limite de taille, analyse JSON et validation métier facultative ;
- `diagnostic()` — statut minimal public sans paramètres URL, historique, données de projet, identité, clés ni utilisateur ;
- `copyDiagnostic()` — copie volontaire, sans transfert vers un serveur ;
- `installDiagnosticControl()` — ajoute un bouton discret « Diag. » dans l'aide intégrée déjà existante, ou dans les réglages d'AutoCoder.

La bibliothèque est **sans dépendance**, en JavaScript navigateur classique, et n'exécute aucune requête réseau. Elle est facultative : si son chargement échoue, les applications doivent continuer à fonctionner.

## Stratégie d'intégration

Chaque application conserve sa **copie locale** `studio-niko-core.js`, identique à `v0.1.0/core.js`, référencée avant `</body>` avec :

```html
<script defer src="./studio-niko-core.js"></script>
```

La copie locale rend la PWA indépendante d'un CDN et compatible avec `Content-Security-Policy: script-src 'self'`. Le fichier canonique est la source de vérité ; toute nouvelle version doit être publiée avec son numéro de version et synchronisée dans les applications concernées, sans écraser leurs modifications métier.

## Journal de production local (Hub)

`hub/pilotage.html` contient désormais un suivi **manuel**, sauvegardé uniquement dans le navigateur : versions, modules, blocages, étapes de reproduction, décisions, preuves déclaratives et prochaines actions par priorité. Son export/import JSON est limité à 1 Mo à l'import ; aucune synchronisation vers GitHub/Vercel n'est effectuée. Les mentions « déployé », « testé » ou « stable » nécessitent une référence, mais ne sont jamais automatiquement vérifiées.

La vue publique contient **50 dépôts publics**, huit copies intégrées du socle et un compteur anonymisé pour les cinq dépôts privés. Les anciennes versions de fichiers dans l'historique Git sont distinctes des fichiers actuels : leur suppression demanderait une opération ciblée de nettoyage d'historique.

## Confidentialité

Le diagnostic ne lit pas les contenus du stockage, n'enregistre pas les messages d'erreur, n'inspecte pas les comptes et n'envoie rien. Le composant **n'est pas un SDK de suivi d'utilisateurs**. Les données de santé nécessitent un stockage chiffré et des politiques spécifiques au projet ; le stockage utilitaire de cette bibliothèque ne les remplace pas.

## États de livraison

Toujours séparer **code créé**, **copie intégrée**, **commit GitHub**, **déploiement confirmé** et **fonctionnement confirmé sur appareil**. Ne pas déclencher de campagne de tests sans instruction expresse de l'utilisateur. Le module n'a pas encore fait l'objet d'une certification de compatibilité iOS/Android.

## Synchronisation maîtrisée entre dépôts clonés

Le script [tools/sync-core.mjs](./tools/sync-core.mjs) inspecte les six copies publiques déclarées dans `registry.json` depuis un dossier regroupant tes dépôts clonés. Il fonctionne localement sur Windows, macOS et Linux, sans token ni API distante, et **ne lance aucun test**.

```bash
node studio-niko-core/tools/sync-core.mjs /chemin/vers/tes/clones
# Appliquer uniquement après revue de la liste des fichiers à modifier :
node studio-niko-core/tools/sync-core.mjs /chemin/vers/tes/clones --apply
```

Le premier appel affiche les différences sans rien écrire. Le deuxième copie uniquement dans les clones présents et refuse d'écraser une copie d'une autre version ou un lien symbolique. Il prépare un fichier temporaire avant de remplacer une copie. Il ne fait aucun `git push`, n'envoie rien à Vercel et n'inclut aucun secret.

## Pilotage public des dépôts

La vue [Studio Niko Pilotage](../hub/pilotage.html) recense **50 dépôts publics** et affiche les six premières copies de Core v0.1.0. Les **5 dépôts privés** restent exclus du registre public ; le total de l'inventaire est de 55. Les états de déploiement et de fonctionnement ne sont jamais déduits de la seule existence d'un commit.

Le tableau contient un instantané du registre intégré dans son HTML, afin de rester consultable sans connexion. Après mise à jour de `registry.json`, rafraîchir cet instantané par :

```bash
node studio-niko-core/tools/refresh-hub.mjs
node studio-niko-core/tools/refresh-hub.mjs --apply
```

La première commande compare sans rien écrire, la deuxième actualise le fichier `hub/pilotage.html`. Il faut ensuite effectuer un commit et, si souhaité, publier le Hub. Aucun déploiement automatique n'est déclenché par ce script.

Voir [ROADMAP.md](./ROADMAP.md) pour la suite des 55 dépôts.

## Module Precision Core (candidat 1.1.0)
Voir [Precision Core](./precision/v1.1.0/README.md). Socle scientifique expérimental séparé, sans intégration automatique aux applications, sans validation clinique. La version 0.1.0 et son registre restent inchangés.
