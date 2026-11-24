# Studio Niko Design — règles permanentes de publication

Ces règles s'appliquent aux nouveaux dépôts originaux du compte Nikoju1977. Budget additionnel maximal : 0 EUR. Ne pas appliquer de marque de propriété, de licence propriétaire ou de métadonnée Studio Niko aux forks; respecter les licences de tous les composants tiers. Ne pas exposer les noms ou contenus privés dans les registres publics.

Avant toute publication d'un dépôt original :
1. Vérifier le statut fork, la visibilité, les droits et les licences déjà applicables. Ne jamais remplacer une licence valide sans autorisation et analyse des droits.
2. Examiner les fichiers et l'historique pour les secrets et données personnelles, sans reproduire les secrets dans les rapports. Ajouter ou compléter .gitignore (secrets locaux, clés privées, configurations confidentielles), sans effacer les règles existantes. Révoquer et renouveler toute clé réellement exposée via le fournisseur.
3. Si aucune licence n'est applicable aux contributions originales, ajouter LICENSE.md avec une notice bilingue « Tous droits réservés », limitée aux droits détenus, et respectant les conditions GitHub, exceptions légales, licences antérieures et droits tiers.
4. Ajouter STUDIO-NIKO-METADATA.json avec le schéma studio-niko-design.provenance/v1, publisher Studio Niko Design, le compte, l'URL du dépôt, le commit de référence, la date réelle, la licence applicable et le lien du registre central. Ne jamais y placer de secret ni revendiquer des droits tiers.
5. Créer un nouveau registre de provenance daté (ne pas réécrire l'ancien), avec références de commits vérifiées et SHA-256 calculé sur les octets exacts. Exclure les forks, dépôts privés et dépôts vides. Conserver les instantanés antérieurs.
6. Lancer le workflow OpenTimestamps avec le nom exact du registre, le commit et son SHA-256. Contrôler le reçu; distinguer reçu en attente, attestation Bitcoin présente et preuve indépendamment vérifiée. Conserver le reçu et l'original hors GitHub.
7. Mettre à jour le catalogue, les guides et le tableau de pilotage de Niko Hub de manière cohérente; conserver les forks comme projets tiers si le catalogue les présente, sans les compter comme créations protégées. Les dépôts vides doivent être explicitement distingués des applications exécutables. Ne jamais publier les dépôts privés.
8. Exécuter les contrôles du projet et du Hub, confirmer les commits, déploiements et résultats réels. Un statut READY ou HTTP 200 ne prouve pas les fonctions interactives. Signaler ce qui n'a pas été testé.

Le registre de référence est dans provenance/. Les métadonnées publiques ne sont pas inviolables. Les contrôles d'intégrité ne constituent ni une signature personnelle ni une preuve exclusive d'auteur. Aucune dépense, réécriture d'historique, publication de secrets ou modification de visibilité sans instruction explicite.
