# MEDGUARD CLINIQUE v2.0 — Dossier de cadrage RGPD (modèle à compléter)

**STATUT : BROUILLON — non approuvé par un DPO — aucune attestation de conformité.**
Date de cadrage : 18 novembre 2026.

## Périmètre effectif de la version fournie

- Version HTML : exécution du contrôle dans le navigateur ; pas de compte, de base de données, de télémétrie ni d'appel de données par le code applicatif ; traitement en mémoire de l'onglet, sauf sauvegarde explicite des bilans techniques sans texte.
- L'interface n'envoie pas les textes saisis vers un serveur. Les fichiers statiques PWA peuvent être mis en cache ; aucun texte soumis n'est mis en cache par l'application.
- L'API est locale (`127.0.0.1`) et nécessite une clé environnement serveur >=32 caractères. Le serveur ne consigne pas volontairement les corps de requête et les scripts de lancement désactivent le journal d'accès d'uvicorn. **Ce n'est pas une infrastructure de santé certifiée.**
- N'utiliser que des données **fictives** pour l'évaluation ; un moteur de détection de coordonnées ne permet pas d'anonymiser des dossiers médicaux.

## Fiche de traitement à compléter par le responsable de traitement

| Rubrique | A renseigner / statut |
| --- | --- |
| Responsable de traitement, coordonnées | À renseigner |
| Sous-traitants et traitements ultérieurs | À définir si futur hébergement / fournisseurs IA |
| DPO ou point de contact | À désigner si requis |
| Finalités déterminées | Exemple de R&D : comparer des sorties IA **fictives** à un corpus documentaire fictif |
| Données personnelles effectivement traitées | Aucune donnée réelle autorisée en phase de prototype |
| Bases légales art. 6 RGPD | À qualifier selon le futur traitement ; ne pas présumer le consentement |
| Condition d'article 9(2) données de santé | À documenter **avant** tout traitement de données de santé réelles |
| Flux / destinataires | Décrire les flux de la cible ; actuellement, aucun service distant intégré |
| Durée de conservation | Pas de sauvegarde applicative des données soumises, mais effets du navigateur/OS hors périmètre |
| Information / droits / contact | Mentions à rédiger et procédures à établir |
| Registre art. 30 | À compléter |
| AIPD art. 35 | À déterminer et réaliser **avant** le traitement à risque élevé |
| Violations de données | Procédure de notification, journal des incidents, habilitations à définir |
| Transferts hors EEE | Aucun fournisseur externe activé dans cette livraison ; toute évolution à analyser |
| HDS | Évaluation de l'obligation au regard du modèle d'exploitation et des données ; certification du prestataire si nécessaire |

## Scénarios à évaluer dans l'AIPD

1. Un utilisateur colle un compte rendu médical avec identité : risque de divulgation via captures, exports système, synchronisation du presse-papiers ou appareil compromis.
2. Un navigateur conserve l'état ou des traces : vérifier les politiques du poste et des navigateurs, y compris la fonction de restauration de session.
3. Une organisation rendrait l'API accessible depuis Internet : l'authentification par clé unique locale n'est pas suffisante pour un service médical professionnel.
4. Un corpus est falsifié ou périmé : absence de vérification cryptographique de l'autorité éditrice, risque patient si utilisation clinique.
5. Un champ source peut contenir des données identifiantes non détectées : les regex d'identifiants sont incomplètes.
6. Une future connexion IA ou RAG peut transférer des données chez un fournisseur : effectuer un nouvel examen juridique, architectural, contractuel et de sécurité avant activation.

## Mesures à concevoir pour un usage réel

- Minimisation, pseudonymisation quand appropriée (qui ne retire pas le régime RGPD), ségrégation des données et séparation des environnements.
- Analyse de besoins HDS, contrats de sous-traitance (art. 28), éventuels transferts internationaux, politique de sécurité et preuves d'audit.
- Authenticité des professionnels via Pro Santé Connect (ou mécanisme adapté), contrôles RBAC/ABAC, principe du moindre privilège.
- Journal d'audit robuste **sans contenu clinique par défaut**, durée de conservation encadrée, supervision, réponse aux incidents.
- Documentation des droits des personnes et des mesures organisationnelles.

## Références institutionnelles

- CNIL — AIPD : https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd
- CNIL — IA et santé : https://www.cnil.fr/fr/ia-et-sante-developper-et-evaluer-des-systemes-ia-conformes
- CNIL — RGPD professionnels santé : https://www.cnil.fr/fr/rgpd-et-professionnels-de-sante-liberaux-ce-que-vous-devez-savoir
- ANS — HDS : https://esante.gouv.fr/labels-certifications/hds/certification-des-hebergeurs-de-donnees-de-sante
- ANS — Pro Santé Connect : https://esante.gouv.fr/produits-services/pro-sante-connect

Ce document constitue une **trame de travail**, ni une AIPD finalisée, ni un avis juridique.
