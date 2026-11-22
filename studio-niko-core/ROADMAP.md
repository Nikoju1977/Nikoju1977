# Feuille de route Studio Niko — 55 dépôts

Date du lot : 22 novembre 2026. Ce document distingue les travaux **committés** des travaux **proposés**. La liste à jour, avec les 55 noms exacts, est dans [registry.json](./registry.json).

## Phase A — Socle technique (code enregistré)

- [x] Source canonique `v0.1.0/core.js` dans ce dépôt principal.
- [x] Copies locales dans les six applications phares : META-STUDIO PRO, Thelovestronautes Machine, AutoCoder, Niko Emploi, Galerie Studio Niko et NikoAssist.
- [x] Chargement optionnel qui ne remplace ni moteur IA ni moteur métier.
- [x] Bouton « Diag. » dans les aides existantes, « Copier diagnostic » dans les réglages AutoCoder.
- [x] Diagnostic déclenché uniquement par clic et sans contenu sensible.
- [x] Utilitaires JSON et stockage local isolé **non utilisés pour les données médicales**.
- [x] Référence des ressources dans les PWA hors ligne (4 des six applications).
- [x] Registre des 55 dépôts et chemins de synchronisation locale.
- [x] Galerie : module intégré à la source, au HTML publié et option d'incrustation dans la construction autonome.

**Limites :** les imports/exports existants restent inchangés ; les utilitaires ne sont pas encore substitués à ces flux. Aucun test utilisateur, revue de sécurité exhaustive ou certification iPhone n'est revendiqué. Les deployments doivent être suivis séparément.

## Phase B — Rendre les six parcours principaux fiables

| Application | Fonction critique à fiabiliser | Livraison attendue |
|---|---|---|
| META-STUDIO PRO | Génération vidéo, quotas fournisseur, timeline et export | État réel du moteur, reprise après erreur, résultat produit ou erreur explicite |
| Thelovestronautes Machine | Échantillonnage, lecture sur iPhone, enregistrement | Aucun silence imprévu ; export WAV non vide, annulation et préservation du projet |
| AutoCoder | Éditeur, prévisualisation, Pyodide, API optionnelle | Erreurs visibles, code sauvegardé, mode hors-ligne expliqué |
| Niko Emploi | Sources d'offres autorisées, filtres et candidatures | Annonces sourcées, suivi fiable, aucun envoi non consenti |
| Galerie Studio Niko | Three.js, mode 2D, médias et sauvegardes | Fonctionnement sur navigateur dépourvu de WebGL, sauvegarde récupérable |
| NikoAssist | Permissions, orchestration et restitution | Afficher les actions réellement exécutées et demander confirmation des opérations sensibles |

## Phase C — Données sensibles et opérations

P0 : `fibrocare`, `fibrobot`, `jarvisdiabete`, `OPENVITA-DT1`, `Boutique-morgane` et `aegis-earth-mobile`. Prévoir une revue spécifique de chaque flux de données et permission ; ne jamais mutualiser indistinctement le stockage local pour les dossiers médicaux, les identifiants ou les paiements.

## Phase D — Extension progressive

Étendre uniquement les modules réellement pertinents aux autres dépôts de [registry.json](./registry.json), en commençant par musique, vidéo, création et jeux. Garder les projets autonomes lorsqu'un cœur commun n'apporte pas de bénéfice concret.

## Métriques à suivre (objectifs, non mesures)

- Aucun bouton cliquable sans effet ni explication.
- Aucune donnée fictive présentée comme donnée réelle.
- Import/export des projets récupérable et non destructif.
- Aucune transmission de clé ou de donnée personnelle à un service non autorisé.
- Séparer code committé / déploiement READY / comportement vérifié.
- Priorité aux interactions tactiles et à la consommation mémoire.

**Demande actuelle du propriétaire :** ne pas déclencher de campagnes de tests supplémentaires sans demande expresse. Les déploiements ne doivent jamais être confondus avec des essais réels.
