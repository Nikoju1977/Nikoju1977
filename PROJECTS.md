# À quoi sert chaque projet ? — Studio Niko Design

[Retour à la vitrine](README.md) · [6 projets signature](SHOWCASE.md) · [Choix des versions de référence](CURATION.md)

Ce guide décrit **la fonction concrète de chaque dépôt public présenté par le studio**, le parcours proposé à l'utilisateur et le statut du code. Les descriptions proviennent des README et de la structure des dépôts consultés le **26 octobre 2026**. Elles ne sont pas des résultats de tests d'exécution.

**Inventaire GitHub au 26 octobre 2026 :** 49 dépôts appartenant au compte, dont 45 publics (profil compris) et 4 privés. Parmi les 44 dépôts de projets publics, **39 projets distincts sont mis en avant**, **4 variantes sont décrites séparément** et **1 projet reste hors sélection éditoriale**. Les dépôts privés ne sont pas répertoriés.

## 39 projets de référence

### 1. Cinéma, image & arts numériques

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [ia-studio-cine](https://github.com/Nikoju1977/ia-studio-cine) | Atelier de création vidéo dans le navigateur : importer images et clips, construire un montage sur une timeline, appliquer des looks et exporter le projet. Une génération via Agnes est proposée avec clé et accès réseau. | Atelier expérimental |
| [Vision-IA](https://github.com/Nikoju1977/Vision-IA) | Assistant de préproduction cinématographique : transformer les documents d'un film en note d'intention, découpage technique, conducteur, pistes de production et dossier exportable. Distingue les données du scénario des suggestions de l'IA. | Projet signature |
| [Niko-Ultravision](https://github.com/Nikoju1977/Niko-Ultravision) | Outil de restauration et d'agrandissement d'images ou vidéos : filtres Canvas et moteur local ONNX de super-résolution, avec accélération WebGPU ou repli WebAssembly. Les détails générés ne garantissent pas la fidélité à l'original. | Outil créatif |
| [Neural-Art-mars-2026](https://github.com/Nikoju1977/Neural-Art-mars-2026) | Atelier de peinture numérique : dessiner avec des brosses, combiner des calques et effets WebGL, expérimenter des rendus assistés et exporter des images. | Prototype artistique |
| [galerie-studio-niko](https://github.com/Nikoju1977/galerie-studio-niko) | Galerie d'exposition 3D : accrocher des tableaux, présenter sculptures, films et sons, régler l'éclairage, créer des cartels et préparer une publication web. | Projet signature |
| [applewatchcadrans](https://github.com/Nikoju1977/applewatchcadrans) | Atelier de design de cadrans analogiques, numériques ou hybrides : prévisualiser une montre et exporter un SVG ou une page HTML animée. Ce ne sont pas des cadrans watchOS installables. | Outil de design |
| [Wan2GP](https://github.com/Nikoju1977/Wan2GP) | Distribution d'un logiciel tiers, WanGP, qui permet de lancer différents modèles ouverts pour générer vidéos, images et sons avec une interface web, une file d'attente et des réglages matériels. Crédit et licences du projet original à préserver. | Projet tiers / amont crédité |

### 2. Musique, audio & création sonore

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [the-lovestronautes-machine](https://github.com/Nikoju1977/the-lovestronautes-machine) | Machine musicale interactive : composer des motifs rythmiques, programmer un séquenceur Web Audio, jouer sur des effets, utiliser MIDI et sauvegarder ou exporter des sessions suivant les capacités du navigateur. | Projet signature |
| [EBM-BRETONNE.](https://github.com/Nikoju1977/EBM-BRETONNE.) | Groovebox Cyber-Fest-Noz mêlant électronique EBM et références sonores bretonnes : programmer et jouer des rythmes directement dans une page web avec Tone.js. | Expérimentation musicale |
| [Dbmetre-pro](https://github.com/Nikoju1977/Dbmetre-pro) | Analyseur sonore au microphone : suivre le niveau dBFS, visualiser le spectre et les fréquences, enregistrer des mesures et les exporter. Il ne remplace pas un sonomètre étalonné. | Outil de mesure exploratoire |

### 3. Santé, bien-être & biomédical

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai) | Visualiseur d'imagerie : ouvrir et comparer des images, consulter certaines séries DICOM non compressées, reconstruire plusieurs plans, annoter et sauvegarder localement. Analyse IA optionnelle, sans validation diagnostique. | Projet signature / prototype |
| [OPENVITA-DT1](https://github.com/Nikoju1977/OPENVITA-DT1) | Tableau de bord expérimental pour le diabète de type 1 : visualiser des données glycémiques Nightscout, des rapports AGP et des calculs pédagogiques inspirés d'oref1. Aucun calcul ne doit piloter un traitement. | Prototype HealthTech |
| [jarvisdiabete](https://github.com/Nikoju1977/jarvisdiabete) | Compagnon vocal DiabCare pour le DT1 : noter des glycémies saisies, consulter un journal, estimer des glucides et utiliser des contenus pédagogiques. Les recommandations de doses d'insuline sont exclues. | Prototype HealthTech |
| [dermato-ai](https://github.com/Nikoju1977/dermato-ai) | Démonstrateur de vision artificielle appliqué à la peau : importer ou photographier une image et obtenir une lecture descriptive par un modèle de vision. Ne permet pas de diagnostiquer une lésion. | Prototype biomédical |
| [purescanai](https://github.com/Nikoju1977/purescanai) | Interface d'exploration dermatologique : autoriser la caméra, lancer une analyse de peau, parcourir les rapports et les espaces routine, produits et chat. Ne constitue ni un examen clinique ni une recommandation de traitement. | Prototype dermatologique |
| [SCAN-BIOMEDICAL](https://github.com/Nikoju1977/SCAN-BIOMEDICAL) | Démonstrateur QUANTUM AI : activer un flux caméra, explorer une analyse IA et afficher des indicateurs biométriques et une courbe de fatigue. Ces métriques ne sont pas des mesures médicales validées. | Prototype biométrique |
| [agent-biometrique](https://github.com/Nikoju1977/agent-biometrique) | Interface de suivi biométrique : regrouper des mesures, observer leur évolution et explorer des interprétations visuelles ou IA. Les alertes et conclusions ne sont pas validées cliniquement. | Prototype biométrique |
| [fibrobot](https://github.com/Nikoju1977/fibrobot) | Assistant conversationnel d'information sur la fibromyalgie : explorer des notions et références scientifiques et poser des questions. Ne remplace ni le diagnostic ni une consultation. | Assistant d'information |
| [fibrocare](https://github.com/Nikoju1977/fibrocare) | Journal personnel de fibromyalgie : consigner douleurs, sommeil, fatigue et humeur, afficher des tendances et préparer une synthèse pour une consultation. | Outil de suivi personnel |
| [presentation-medtronic](https://github.com/Nikoju1977/presentation-medtronic) | Présentation HTML interactive de concepts et technologies liés au diabète et aux boucles fermées. Projet indépendant, non affilié à Medtronic, sans vocation de programmation médicale. | Présentation pédagogique |

### 4. Assistants & agents IA

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [Nikoassist](https://github.com/Nikoju1977/Nikoassist) | Surcouche et installateur d'un système multi-agents basé sur nanoMuse : coordonner des rôles spécialisés, limiter les budgets d'exécution et soumettre les actions sensibles à des autorisations. | Projet signature / intégration open source |
| [Ron-](https://github.com/Nikoju1977/Ron-) | Assistant multimodal web : discuter par texte ou voix, utiliser des modèles locaux compatibles Ollama et explorer des modes compagnons et agents. Le micro et les actions dépendent des autorisations. | Assistant expérimental |
| [Sage-companion](https://github.com/Nikoju1977/Sage-companion) | Compagnon vocal mobile-first en français : conversation par reconnaissance et synthèse vocale, outils de météo ou Wikipédia et préparation d'actions téléphoniques sous confirmation. | Assistant expérimental |

### 5. Jeux & expériences interactives

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [Bouh-delivery](https://github.com/Nikoju1977/Bouh-delivery) | Jeu de conduite d'Halloween en JavaScript : piloter un corbillard, collecter des bonbons, éviter ou viser des obstacles et progresser à travers des niveaux et boss. | Jeu navigateur |
| [Cosmo-citrouille](https://github.com/Nikoju1977/Cosmo-citrouille) | Jeu d'aventure spatiale pour enfants : parcourir des galaxies, relever des défis, affronter des boss et reprendre sa progression sauvegardée localement. Une adaptation Capacitor est préparée. | Jeu navigateur / mobile expérimental |
| [miaotris](https://github.com/Nikoju1977/miaotris) | Petit jeu de pièces à thème félin : déplacer les blocs, les faire pivoter et accélérer leur chute, avec commandes affichées dans l'interface. Le dépôt contient également des créations graphiques complémentaires. | Jeu expérimental |

### 6. Sites, services & applications du quotidien

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [Boutique-morgane](https://github.com/Nikoju1977/Boutique-morgane) | Site vitrine et catalogue de créations : présenter des articles, préparer une demande de commande, explorer un tarot, un grimoire et des fiches de minéraux. Aucun paiement intégré automatique n'est annoncé. | Site vitrine / boutique en préparation |
| [handimonde](https://github.com/Nikoju1977/handimonde) | Carte d'informations sur l'accessibilité des lieux : rechercher des établissements et équipements à partir de données OpenStreetMap, avec services API complémentaires. Les données doivent être vérifiées avant un déplacement. | Projet signature / service cartographique |
| [job-search](https://github.com/Nikoju1977/job-search) | Application de recherche d'emploi : classer des offres selon des critères explicables, organiser un profil candidat et activer une veille opt-in. Les fonctions serveur exigent une configuration privée et n'envoient pas de candidature sans autorisation. | Service candidat / backend conditionnel |
| [aylina-is-cooking](https://github.com/Nikoju1977/aylina-is-cooking) | Carnet de desserts « Aylina Cookies » : consulter des recettes, explorer des portions avec un calculateur, accéder à Chef Mistral et enregistrer des favoris. Les conseils nutritionnels ne sont pas des décisions médicales. | Prototype culinaire |

### 7. Industrie, géodonnées & outils métier

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [cockpit-mecaria](https://github.com/Nikoju1977/cockpit-mecaria) | Cockpit de pilotage d'atelier : tableaux qualité, métrologie, production, non-conformités, méthodes d'amélioration et exports locaux. La gestion des rôles est illustrative, pas une authentification. | Prototype industriel |
| [Metrology-OS](https://github.com/Nikoju1977/Metrology-OS) | Outil de gestion d'un parc d'instruments : suivre étalonnages, périodicités, certificats, procédures et recherches dans une interface web. Ne délivre pas de certification métrologique. | Prototype métier |
| [aegis-earth-mobile](https://github.com/Nikoju1977/aegis-earth-mobile) | Carte géospatiale mobile combinant des couches publiques : caméras de circulation TfL, trafic aérien disponible, météo, qualité de l'air, indicateurs spatiaux et imports GeoJSON. Les flux tiers peuvent être limités. | PWA / adaptation mobile |
| [radar-de-niko](https://github.com/Nikoju1977/radar-de-niko) | Moteur de veille territoriale modulaire : collecter des sources d'actualité, dédupliquer et transformer les résultats en flux RSS, JSONL, pages de synthèse et PWA locale. | Outil de veille |

### 8. Jardin, symbolique & spiritualité

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [oracle-du-jardinier](https://github.com/Nikoju1977/oracle-du-jardinier) | Assistant de jardinage : consulter la météo, explorer des plantes locales, préparer des conseils de culture et tester une analyse photo optionnelle avec IA. Les calendriers biodynamiques sont des pratiques interprétatives. | Prototype jardin |
| [tarot-de-niko](https://github.com/Nikoju1977/tarot-de-niko) | Tarot numérique de réflexion symbolique : réaliser des tirages parmi 78 cartes, interpréter localement les associations et tenir un journal chiffré, avec commentaire IA facultatif. | Expérience symbolique |
| [oeil-hermes](https://github.com/Nikoju1977/oeil-hermes) | Grimoire de correspondances alchimiques, astrologiques et symboliques : naviguer entre des notions, afficher un graphe et effectuer des calculs astronomiques et numérologiques. | Expérience symbolique |
| [les-annales-akashiques](https://github.com/Nikoju1977/les-annales-akashiques) | Expérience numérique d'exploration spirituelle : numérologie, repères astrologiques et journal personnel avec sauvegarde locale. Les interprétations ne sont pas des prédictions scientifiques. | Expérience symbolique |

### 9. Cybersécurité & qualité logicielle

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [White-hat](https://github.com/Nikoju1977/White-hat) | Cockpit AEGIS de revue défensive des dépôts GitHub publics : examiner la présence de documentation, licences, politiques de sécurité et certaines configurations, puis exporter des constats. Les contrôles sont heuristiques et en lecture seule. | Prototype d'audit défensif |

## Quatre variantes secondaires conservées

Elles restent publiques pour préserver le code, les essais et l'historique, mais **ne sont pas affichées comme des applications distinctes sur la page d'accueil**.

| Variante | À quoi elle sert | Projet privilégié |
| --- | --- | --- |
| [nikogroove](https://github.com/Nikoju1977/nikogroove) | Version parallèle du Cyber-Fest-Noz, groovebox HTML/Tone.js apparentée à EBM-BRETONNE. ; conservée pour suivre ses essais et son historique. | [EBM-BRETONNE.](https://github.com/Nikoju1977/EBM-BRETONNE.) |
| [Medivision-ai-pro](https://github.com/Nikoju1977/Medivision-ai-pro) | Base PWA Lit/TypeScript/Vite issue d'un starter PWABuilder ; ne contient pas encore les fonctionnalités de visualisation médicale du projet de référence. | [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai) |
| [compagnon-diabete](https://github.com/Nikoju1977/compagnon-diabete) | Prototype DAPHNÉE OMNI : interface expérimentale de compagnon diabète, avec pistes d'assistance IA et suivi informatif ; non destinée au traitement. | [OPENVITA-DT1](https://github.com/Nikoju1977/OPENVITA-DT1) |
| [le-jardin-de-niko](https://github.com/Nikoju1977/le-jardin-de-niko) | Variante Terroir Synthétique de l'Oracle du Jardinier : météo, qualité de l'air, suivi des semis, tâches et journal local, avec pistes de conseils IA. | [oracle-du-jardinier](https://github.com/Nikoju1977/oracle-du-jardinier) |

## Comprendre le niveau de maturité

- **Projet signature** : sélectionné pour raconter un usage et des choix techniques ; ne signifie pas qu'un service est disponible ou certifié.
- **Prototype / expérimentation** : concept ou fonction en développement, sans validation indépendante revendiquée.
- **Outil / service** : vocation pratique documentée ; installation, déploiement, qualité des données et tests dépendent de son README.
- **Projet tiers** : origine, auteurs et licences amont à préserver.

Les interfaces liées à la santé ne sont **ni des dispositifs médicaux certifiés ni des bases de décision thérapeutique**. Les applications d'IA peuvent demander un fournisseur externe, une clé personnelle ou une configuration serveur. Un lien vers un dépôt ne garantit pas une démo déployée.

**[Revenir au profil Studio Niko Design](README.md)**
