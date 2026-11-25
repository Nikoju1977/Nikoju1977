# À quoi sert chaque projet ? — Studio Niko Design

[Retour à la vitrine](README.md) · [6 projets signature](SHOWCASE.md) · [Choix des versions de référence](CURATION.md)

Ce guide décrit **la fonction concrète de chaque dépôt public présenté par le studio**, le parcours proposé à l'utilisateur et le statut du code. Les descriptions proviennent des README et de la structure des dépôts consultés le **26 octobre 2026**. Elles ne sont pas des résultats de tests d'exécution.

**Inventaire GitHub au 26 octobre 2026 :** 49 dépôts appartenant au compte, dont 45 publics (profil compris) et 4 privés. Parmi les 44 dépôts de projets publics, **39 projets distincts sont mis en avant**, **4 variantes sont décrites séparément** et **1 projet reste hors sélection éditoriale**. Les dépôts privés ne sont pas répertoriés.

## Actualisation du 25 novembre 2026

Inventaire GitHub relu : 58 dépôts, 53 publics (profil inclus) et cinq privés non détaillés. La sélection historique de 39 références et 4 variantes reste distincte du [catalogue complet](hub/catalog.json).

## 39 projets de référence

### 1. Cinéma, image & arts numériques

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [ia-studio-cine](https://github.com/Nikoju1977/ia-studio-cine) | META-STUDIO PRO V6 : storyboard, connecteurs LTX/Agnes, timeline et MediaRecorder. Génération distante soumise aux quotas et CORS ; rendu réel non revérifié. | Atelier expérimental |
| [Vision-IA](https://github.com/Nikoju1977/Vision-IA) | Préproduction, documents, découpage, conducteur local et routage LLM. Documents non chiffrés par le coffre de clés ; extraits susceptibles d'être transmis. | Projet signature |
| [Niko-Ultravision](https://github.com/Nikoju1977/Niko-Ultravision) | Outil de restauration et d'agrandissement d'images ou vidéos : filtres Canvas et moteur local ONNX de super-résolution, avec accélération WebGPU ou repli WebAssembly. Les détails générés ne garantissent pas la fidélité à l'original. | Outil créatif |
| [Neural-Art-mars-2026](https://github.com/Nikoju1977/Neural-Art-mars-2026) | Atelier de peinture numérique : dessiner avec des brosses, combiner des calques et effets WebGL, expérimenter des rendus assistés et exporter des images. | Prototype artistique |
| [galerie-studio-niko](https://github.com/Nikoju1977/galerie-studio-niko) | Galerie d'exposition 3D : accrocher des tableaux, présenter sculptures, films et sons, régler l'éclairage, créer des cartels et préparer une publication web. | Projet signature |
| [applewatchcadrans](https://github.com/Nikoju1977/applewatchcadrans) | Atelier de design de cadrans analogiques, numériques ou hybrides : prévisualiser une montre et exporter un SVG ou une page HTML animée. Ce ne sont pas des cadrans watchOS installables. | Outil de design |
| [Wan2GP](https://github.com/Nikoju1977/Wan2GP) | Distribution d'un logiciel tiers, WanGP, qui permet de lancer différents modèles ouverts pour générer vidéos, images et sons avec une interface web, une file d'attente et des réglages matériels. Crédit et licences du projet original à préserver. | Projet tiers / amont crédité |

### 2. Musique, audio & création sonore

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [the-lovestronautes-machine](https://github.com/Nikoju1977/the-lovestronautes-machine) | Station 18 pistes, synthèse, patchbay, WAV/MP3, MIDI et arrangement. | Projet signature |
| [EBM-BRETONNE.](https://github.com/Nikoju1977/EBM-BRETONNE.) | Groovebox Cyber-Fest-Noz mêlant électronique EBM et références sonores bretonnes : programmer et jouer des rythmes directement dans une page web avec Tone.js. | Expérimentation musicale |
| [Dbmetre-pro](https://github.com/Nikoju1977/Dbmetre-pro) | Analyseur sonore au microphone : suivre le niveau dBFS, visualiser le spectre et les fréquences, enregistrer des mesures et les exporter. Il ne remplace pas un sonomètre étalonné. | Outil de mesure exploratoire |

### 3. Santé, bien-être & biomédical

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai) | DICOM/MPR local et IA distante optionnelle. Images/contexte transmis au fournisseur ; clés hors coffre, anciens dossiers en clair possibles. Données fictives uniquement. | Projet signature / prototype |
| [OPENVITA-DT1](https://github.com/Nikoju1977/OPENVITA-DT1) | Journal glycémique manuel ; heuristiques de doses non validées. Ne pas utiliser pour traiter. Nightscout/oref1/AGP non démontrés dans le fichier principal ; données et clés en clair. | Prototype HealthTech |
| [jarvisdiabete](https://github.com/Nikoju1977/jarvisdiabete) | Compagnon vocal DiabCare pour le DT1 : noter des glycémies saisies, consulter un journal, estimer des glucides et utiliser des contenus pédagogiques. Les recommandations de doses d'insuline sont exclues. | Prototype HealthTech |
| [dermato-ai](https://github.com/Nikoju1977/dermato-ai) | OpenCV, Face Mesh et Pixtral distant ; métriques non validées. Scores de secours, stockage en clair et rendu HTML à sécuriser ; données fictives uniquement. | Prototype biomédical |
| [purescanai](https://github.com/Nikoju1977/purescanai) | Trois requêtes Pixtral/Mistral ; scores cutanés générés, non mesurés. Ne pas utiliser pour diagnostiquer ou traiter. Flux d'images distants. | Prototype dermatologique |
| [SCAN-BIOMEDICAL](https://github.com/Nikoju1977/SCAN-BIOMEDICAL) | Repères faciaux et EAR ; estimation BPM/fatigue non fiable. Prototype non clinique. Données fictives uniquement. | Prototype biométrique |
| [agent-biometrique](https://github.com/Nikoju1977/agent-biometrique) | Démonstrateur : aperçu caméra, scores générés à partir de l'heure et du hasard, sans analyse de pixels. Aucune mesure biométrique établie ; ne pas utiliser pour la santé ou la sécurité. | Simulation |
| [fibrobot](https://github.com/Nikoju1977/fibrobot) | Compagnon documentaire, coffre AES-GCM et IA facultative. Refus et rappels non validés cliniquement. Flux IA à auditer. | Assistant d'information |
| [fibrocare](https://github.com/Nikoju1977/fibrocare) | Journal, graphiques et PDF ; stockage local non chiffré. Sauvegarde et informations thérapeutiques à fiabiliser. Données fictives uniquement. | Outil de suivi personnel |
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
| [cockpit-mecaria](https://github.com/Nikoju1977/cockpit-mecaria) | Qualité, SPC, R&R, TRS et gouvernance IA. Coffre de clés distinct ; rôles déclaratifs et journal modifiable. | Prototype industriel |
| [Metrology-OS](https://github.com/Nikoju1977/Metrology-OS) | Incertitudes, bande de garde et gestion métrologique. Calculs simplifiés non qualifiés ; aucune accréditation ou certification. | Prototype métier |
| [aegis-earth-mobile](https://github.com/Nikoju1977/aegis-earth-mobile) | Carte géospatiale mobile combinant des couches publiques : caméras de circulation TfL, trafic aérien disponible, météo, qualité de l'air, indicateurs spatiaux et imports GeoJSON. Les flux tiers peuvent être limités. | PWA / adaptation mobile |
| [radar-de-niko](https://github.com/Nikoju1977/radar-de-niko) | Moteur de veille territoriale modulaire : collecter des sources d'actualité, dédupliquer et transformer les résultats en flux RSS, JSONL, pages de synthèse et PWA locale. | Outil de veille |

### 8. Jardin, symbolique & spiritualité

| Dépôt | Ce qu'il fait concrètement | Positionnement |
| --- | --- | --- |
| [oracle-du-jardinier](https://github.com/Nikoju1977/oracle-du-jardinier) | Assistant de jardinage : consulter la météo, explorer des plantes locales, préparer des conseils de culture et tester une analyse photo optionnelle avec IA. Les calendriers biodynamiques sont des pratiques interprétatives. | Prototype jardin |
| [tarot-de-niko](https://github.com/Nikoju1977/tarot-de-niko) | Tarot numérique de réflexion symbolique : réaliser des tirages parmi 78 cartes, interpréter localement les associations et tenir un journal chiffré, avec commentaire IA facultatif. | Expérience symbolique |
| [oeil-hermes](https://github.com/Nikoju1977/oeil-hermes) | Grimoire de correspondances alchimiques, astrologiques et symboliques : naviguer entre des notions, afficher un graphe et effectuer des calculs astronomiques et numérologiques. | Expérience symbolique |
| [les-annales-akashiques](https://github.com/Nikoju1977/les-annales-akashiques) | Expérience numérique d'exploration spirituelle : numérologie, repères astrologiques et journal personnel local non chiffré ; ne pas saisir de données intimes. Les interprétations ne sont pas des prédictions scientifiques. | Expérience symbolique |

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
| [compagnon-diabete](https://github.com/Nikoju1977/compagnon-diabete) | Prototype DAPHNÉE OMNI : lecture Bluetooth non fiable, secrets non chiffrés ; ne pas connecter de dispositif médical réel. | [OPENVITA-DT1](https://github.com/Nikoju1977/OPENVITA-DT1) |
| [le-jardin-de-niko](https://github.com/Nikoju1977/le-jardin-de-niko) | Variante Terroir Synthétique de l'Oracle du Jardinier : météo, qualité de l'air, suivi des semis, tâches et journal local, avec pistes de conseils IA. | [oracle-du-jardinier](https://github.com/Nikoju1977/oracle-du-jardinier) |

## Comprendre le niveau de maturité

- **Projet signature** : sélectionné pour raconter un usage et des choix techniques ; ne signifie pas qu'un service est disponible ou certifié.
- **Prototype / expérimentation** : concept ou fonction en développement, sans validation indépendante revendiquée.
- **Outil / service** : vocation pratique documentée ; installation, déploiement, qualité des données et tests dépendent de son README.
- **Projet tiers** : origine, auteurs et licences amont à préserver.

Les interfaces liées à la santé ne sont **ni des dispositifs médicaux certifiés ni des bases de décision thérapeutique**. Les applications d'IA peuvent demander un fournisseur externe, une clé personnelle ou une configuration serveur. Un lien vers un dépôt ne garantit pas une démo déployée.

**[Revenir au profil Studio Niko Design](README.md)**


## Registre technique — 45 dépôts documentés

README et références de licence relus le 25 novembre 2026. Les 45 README sont accessibles sur main et contiennent un diagramme Mermaid et un résumé anglais, vérifiés par lecture. Deux projets déclarent MIT dans package.json sans fichier de licence autonome identifié à la racine. Les mises à jour documentaires ne sont pas des tests. Les liens main sont mobiles. Aucune validation de production n'est inférée. Les licences tierces prévalent pour les composants concernés.

| Projet / project | Périmètre | Licence |
| --- | --- | --- |
| **[Neural-Art-mars-2026](https://github.com/Nikoju1977/Neural-Art-mars-2026/blob/main/README.md)** | Art / Three.js, MediaPipe, cordes sonores | [Droits réservés](https://github.com/Nikoju1977/Neural-Art-mars-2026/blob/main/LICENSE.md) |
| **[niko-music-lab](https://github.com/Nikoju1977/niko-music-lab/blob/main/README.md)** | Audio / 12 pistes, synthèse EBM, WAV/MIDI | [Droits réservés](https://github.com/Nikoju1977/niko-music-lab/blob/main/LICENSE.md) |
| **[RF-Metrology-Pro](https://github.com/Nikoju1977/RF-Metrology-Pro/blob/main/README.md)** | RF / Android Java, export chiffré, qualification requise | [Droits réservés](https://github.com/Nikoju1977/RF-Metrology-Pro/blob/main/LICENSE.md) |
| **[AutoCoder-Studio-Niko](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/blob/main/README.md)** | Dev tools / templates locaux, Pyodide, sandbox HTML | [Droits réservés](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/blob/main/LICENSE.md) |
| **[Nikoassist](https://github.com/Nikoju1977/Nikoassist/blob/main/README.md)** | Agents / Python et PWA distincte | [GPL-3.0](https://github.com/Nikoju1977/Nikoassist/blob/main/LICENSE) |
| **[Ron-](https://github.com/Nikoju1977/Ron-/blob/main/README.md)** | Agents / routage navigateur, local et distant | [Droits réservés](https://github.com/Nikoju1977/Ron-/blob/main/LICENSE.md) |
| **[Rave-Generator-2](https://github.com/Nikoju1977/Rave-Generator-2/blob/main/README.md)** | Audio / groovebox Web Audio, WAV/MIDI | [Droits réservés](https://github.com/Nikoju1977/Rave-Generator-2/blob/main/LICENSE.md) |
| **[the-lovestronautes-machine](https://github.com/Nikoju1977/the-lovestronautes-machine/blob/main/README.md)** | Audio / 18 pistes, PCM/MP3, lamejs LGPL-3.0 | [MIT](https://github.com/Nikoju1977/the-lovestronautes-machine/blob/main/LICENSE) |
| **[nikogroove](https://github.com/Nikoju1977/nikogroove/blob/main/README.md)** | Audio / variante EBM-Breizh, Tone.js | [Droits réservés](https://github.com/Nikoju1977/nikogroove/blob/main/LICENSE.md) |
| **[Metrology-OS](https://github.com/Nikoju1977/Metrology-OS/blob/main/README.md)** | Industrie / incertitudes, bande de garde non qualifiée | [Droits réservés](https://github.com/Nikoju1977/Metrology-OS/blob/main/LICENSE.md) |
| **[SCAN-BIOMEDICAL](https://github.com/Nikoju1977/SCAN-BIOMEDICAL/blob/main/README.md)** | Vision / EAR, BPM et fatigue non fiables | [Droits réservés](https://github.com/Nikoju1977/SCAN-BIOMEDICAL/blob/main/LICENSE.md) |
| **[cockpit-mecaria](https://github.com/Nikoju1977/cockpit-mecaria/blob/main/README.md)** | Industrie / SPC, R&R, TRS, coffre de clés | [Droits réservés](https://github.com/Nikoju1977/cockpit-mecaria/blob/main/LICENSE.md) |
| **[fibrocare](https://github.com/Nikoju1977/fibrocare/blob/main/README.md)** | Santé / journal et PDF, stockage non chiffré | [MIT](https://github.com/Nikoju1977/fibrocare/blob/main/LICENSE) |
| **[fibrobot](https://github.com/Nikoju1977/fibrobot/blob/main/README.md)** | Santé / coffre chiffré, règles documentaires, IA facultative | [Droits réservés](https://github.com/Nikoju1977/fibrobot/blob/main/LICENSE.md) |
| **[OPENVITA-DT1](https://github.com/Nikoju1977/OPENVITA-DT1/blob/main/README.md)** | Santé / journal manuel, doses non validées | [MIT](https://github.com/Nikoju1977/OPENVITA-DT1/blob/main/LICENSE) |
| **[medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai/blob/main/README.md)** | Imagerie / DICOM-MPR, MIP/MinIP, coffre examens, IA distante ; [approfondissement](https://github.com/Nikoju1977/medicalvisionproai/commit/5d07e4ca0d3dbcf7c053e7196df60af40c751d31) | [MIT](https://github.com/Nikoju1977/medicalvisionproai/blob/main/LICENSE) |
| **[dermato-ai](https://github.com/Nikoju1977/dermato-ai/blob/main/README.md)** | Vision / OpenCV, Face Mesh, Pixtral, métriques non validées | [MIT](https://github.com/Nikoju1977/dermato-ai/blob/main/LICENSE) |
| **[purescanai](https://github.com/Nikoju1977/purescanai/blob/main/README.md)** | Vision / trois requêtes IA, scores non mesurés | [Droits réservés](https://github.com/Nikoju1977/purescanai/blob/main/LICENSE.md) |
| **[ia-studio-cine](https://github.com/Nikoju1977/ia-studio-cine/blob/main/README.md)** | Cinéma / connecteurs LTX-Agnes, montage, MediaRecorder | [Droits réservés](https://github.com/Nikoju1977/ia-studio-cine/blob/main/LICENSE.md) |
| **[N8V](https://github.com/Nikoju1977/N8V/blob/main/README.md)** | Audio / NIKO ANALOG 37, PCM WAV, pas un codec vidéo | [Droits réservés](https://github.com/Nikoju1977/N8V/blob/main/LICENSE.md) |
| **[Vision-IA](https://github.com/Nikoju1977/Vision-IA/blob/main/README.md)** | Cinéma / dépouillement reprenable, conducteur local | [Droits réservés](https://github.com/Nikoju1977/Vision-IA/blob/main/LICENSE.md) |

| **[Niko-Ultravision](https://github.com/Nikoju1977/Niko-Ultravision/blob/main/README.md)** | Image / ONNX local, WebGPU/WASM, WebCodecs et mesures SSIM/PSNR · [commit documentaire](https://github.com/Nikoju1977/Niko-Ultravision/commit/26288b30fd44fadf1305c22375ce0e38e5c405b8) | [Droits réservés](https://github.com/Nikoju1977/Niko-Ultravision/blob/main/LICENSE.md) |
| **[AutoEntrepreneur-1M](https://github.com/Nikoju1977/AutoEntrepreneur-1M/blob/main/README.md)** | Business / catalogue combinatoire, rapports déterministes, pas de LLM · [commit documentaire](https://github.com/Nikoju1977/AutoEntrepreneur-1M/commit/6bb4c41e3776e2bfcdd311f12956808a572e5c48) | [Droits réservés](https://github.com/Nikoju1977/AutoEntrepreneur-1M/blob/main/LICENSE.md) |
| **[job-search](https://github.com/Nikoju1977/job-search/blob/main/README.md)** | Emploi / six connecteurs, MiniLM local optionnel, veille serveur conditionnelle · [commit documentaire](https://github.com/Nikoju1977/job-search/commit/0aea2603ed4f01f479a79bcf43ade423ce5bb58e) | [Droits réservés](https://github.com/Nikoju1977/job-search/blob/main/LICENSE.md) |
| **[Sage-companion](https://github.com/Nikoju1977/Sage-companion/blob/main/README.md)** | Assistant vocal / Mistral, mémoire locale, actions confirmées, coûts non garantis · [commit documentaire](https://github.com/Nikoju1977/Sage-companion/commit/5af2d2d12d2956934120947ec2e5d557484817a9) | [Droits réservés](https://github.com/Nikoju1977/Sage-companion/blob/main/LICENSE.md) |
| **[niko-commande-live-tik-tok](https://github.com/Nikoju1977/niko-commande-live-tik-tok/blob/main/README.md)** | Live / conducteur et sauvegarde locale, sans commande TikTok ou OBS · [commit documentaire](https://github.com/Nikoju1977/niko-commande-live-tik-tok/commit/04a1655f04bebf3a8fe1542577ad5152aebc13f4) | [Droits réservés](https://github.com/Nikoju1977/niko-commande-live-tik-tok/blob/main/LICENSE.md) |

| **[White-hat](https://github.com/Nikoju1977/White-hat/blob/main/README.md)** | Sécurité / heuristiques GitHub et Sentinel statistique, non certifié · [commit documentaire](https://github.com/Nikoju1977/White-hat/commit/c49f3e31f2a15b6b9fb80b8c830594e94c7eb140) | [MIT](https://github.com/Nikoju1977/White-hat/blob/main/LICENSE) |
| **[aegis-earth-mobile](https://github.com/Nikoju1977/aegis-earth-mobile/blob/main/README.md)** | Géospatial / Cesium, Haversine, données publiques, Capacitor · [commit documentaire](https://github.com/Nikoju1977/aegis-earth-mobile/commit/81315a4e1258f2b85e18234c0979083925c2a95d) | [MIT déclaré, fichier autonome absent](https://github.com/Nikoju1977/aegis-earth-mobile/blob/main/package.json) |
| **[Boutique-morgane](https://github.com/Nikoju1977/Boutique-morgane/blob/main/README.md)** | Commerce / vitrine, demandes locales, D1 conditionnel ; aucun paiement établi · [commit documentaire](https://github.com/Nikoju1977/Boutique-morgane/commit/e6118cce6c705af580db25757209ba67e62c984a) | [Droits réservés](https://github.com/Nikoju1977/Boutique-morgane/blob/main/LICENSE.md) |
| **[handimonde](https://github.com/Nikoju1977/handimonde/blob/main/README.md)** | Accessibilité / Leaflet, OSM, Overpass, relais IA optionnel · [commit documentaire](https://github.com/Nikoju1977/handimonde/commit/e128ea625374fb5f9e16edf6e33022bf56362be0) | [Droits réservés ; OSM ODbL](https://github.com/Nikoju1977/handimonde/blob/main/LICENSE) |
| **[galerie-studio-niko](https://github.com/Nikoju1977/galerie-studio-niko/blob/main/README.md)** | Art / Three.js, audio spatial, publication Supabase à sécuriser · [commit documentaire](https://github.com/Nikoju1977/galerie-studio-niko/commit/eb73fbf9c64a06bb9cd2b300a3397dc8d2bb23a4) | [MIT déclaré, fichier autonome absent](https://github.com/Nikoju1977/galerie-studio-niko/blob/main/package.json) |

| **[Dbmetre-pro](https://github.com/Nikoju1977/Dbmetre-pro/blob/main/README.md)** | Audio / RMS, FFT 4096 points, dBFS ; non étalonné · [commit documentaire](https://github.com/Nikoju1977/Dbmetre-pro/commit/fd487594b1b2a55307053be7edecffd5d20923b2) | [Droits réservés](https://github.com/Nikoju1977/Dbmetre-pro/blob/main/LICENSE.md) |
| **[agent-biometrique](https://github.com/Nikoju1977/agent-biometrique/blob/main/README.md)** | Démonstrateur / caméra de prévisualisation, scores aléatoires non mesurés ; P0 · [commit documentaire](https://github.com/Nikoju1977/agent-biometrique/commit/1185aeb74c899a794b68a34c56703edabf6ce808) | [Droits réservés](https://github.com/Nikoju1977/agent-biometrique/blob/main/LICENSE.md) |

| **[jarvisdiabete](https://github.com/Nikoju1977/jarvisdiabete/blob/main/README.md)** | Assistant documentaire / Qwen et Whisper locaux optionnels, coffre AES-GCM · [commit documentaire](https://github.com/Nikoju1977/jarvisdiabete/commit/4ca10379a987711721ad3304ba11a373d292587c) | [Droits réservés](https://github.com/Nikoju1977/jarvisdiabete/blob/main/LICENSE.md) |
| **[compagnon-diabete](https://github.com/Nikoju1977/compagnon-diabete/blob/main/README.md)** | Variante Daphnée / lecture Bluetooth non fiable, clé non chiffrée · [commit documentaire](https://github.com/Nikoju1977/compagnon-diabete/commit/9f383e463cbe69b118f61c68b6c9710e449fec88) | [Droits réservés](https://github.com/Nikoju1977/compagnon-diabete/blob/main/LICENSE.md) |
| **[Medivision-ai-pro](https://github.com/Nikoju1977/Medivision-ai-pro/blob/main/README.md)** | Starter PWABuilder / Lit, Vite, Workbox ; aucun moteur médical · [commit documentaire](https://github.com/Nikoju1977/Medivision-ai-pro/commit/8caa2123115a4f570a34868ae19b99b420cc0c23) | [MIT notice Microsoft ; ISC dans manifeste, périmètre à clarifier](https://github.com/Nikoju1977/Medivision-ai-pro/blob/main/LICENSE.txt) |

| **[oracle-du-jardinier](https://github.com/Nikoju1977/oracle-du-jardinier/blob/main/README.md)** | Jardin / Open-Meteo, profils locaux, vision Mistral non qualifiée · [commit documentaire](https://github.com/Nikoju1977/oracle-du-jardinier/commit/646e23a5b1793f2ed80d840ad0b63886549b0e59) | [Droits réservés](https://github.com/Nikoju1977/oracle-du-jardinier/blob/main/LICENSE.md) |
| **[le-jardin-de-niko](https://github.com/Nikoju1977/le-jardin-de-niko/blob/main/README.md)** | Variante / IndexedDB, météo, repli fournisseurs IA, sol déclaré · [commit documentaire](https://github.com/Nikoju1977/le-jardin-de-niko/commit/811f385c8b1555c02bb081728e5d1967bc17f0f6) | [MIT](https://github.com/Nikoju1977/le-jardin-de-niko/blob/main/LICENSE) |
| **[radar-de-niko](https://github.com/Nikoju1977/radar-de-niko/blob/main/README.md)** | Veille / Node.js, graphe de collecte, Jaccard, sorties RSS et JSONL · [commit documentaire](https://github.com/Nikoju1977/radar-de-niko/commit/8c6d895a03c972022be5c13e85379ea9e01b859d) | [Droits réservés](https://github.com/Nikoju1977/radar-de-niko/blob/main/LICENSE.md) |

| **[EBM-BRETONNE.](https://github.com/Nikoju1977/EBM-BRETONNE./blob/main/README.md)** | Audio / Tone.js, synthèse d'anche et bourdon, séquenceur 4 × 16 · [commit documentaire](https://github.com/Nikoju1977/EBM-BRETONNE./commit/97dd47753c1b7767588203946fd96783ffdc9d22) | [Droits réservés](https://github.com/Nikoju1977/EBM-BRETONNE./blob/main/LICENSE.md) |
| **[miaotris](https://github.com/Nikoju1977/miaotris/blob/main/README.md)** | Jeu / Canvas 2D, matrice 10 × 20, collisions et score · [commit documentaire](https://github.com/Nikoju1977/miaotris/commit/450756ea68915bec75933676da09ce2e45431c26) | [Droits réservés](https://github.com/Nikoju1977/miaotris/blob/main/LICENSE.md) |
| **[Cosmo-citrouille](https://github.com/Nikoju1977/Cosmo-citrouille/blob/main/README.md)** | Jeu / 140 configurations, 14 boss, Canvas et projet Capacitor · [commit documentaire](https://github.com/Nikoju1977/Cosmo-citrouille/commit/60b6744321a40a92f940ff84fc8d27fd344c6d) | [Droits réservés](https://github.com/Nikoju1977/Cosmo-citrouille/blob/main/LICENSE.md) |

| **[tarot-de-niko](https://github.com/Nikoju1977/tarot-de-niko/blob/main/README.md)** | Symbolique / Fisher–Yates, aléa Web Crypto, journal AES-GCM · [commit documentaire](https://github.com/Nikoju1977/tarot-de-niko/commit/3bc06676f03cb716948676a11d4cbfea5d28c53e) | [MIT](https://github.com/Nikoju1977/tarot-de-niko/blob/main/LICENSE) |
| **[oeil-hermes](https://github.com/Nikoju1977/oeil-hermes/blob/main/README.md)** | Graphe de correspondances, calculs astronomiques approximatifs, clés chiffrées · [commit documentaire](https://github.com/Nikoju1977/oeil-hermes/commit/9326b98afd9373e686191a85648c200b8dd3c20d) | [Droits réservés](https://github.com/Nikoju1977/oeil-hermes/blob/main/LICENSE.md) |
| **[les-annales-akashiques](https://github.com/Nikoju1977/les-annales-akashiques/blob/main/README.md)** | Narration symbolique / règles locales, IA optionnelle, journal non chiffré · [commit documentaire](https://github.com/Nikoju1977/les-annales-akashiques/commit/54ca5a79051e02c0c05ddec38e262dc4e3bb93cc) | [Droits réservés](https://github.com/Nikoju1977/les-annales-akashiques/blob/main/LICENSE.md) |

### Documentation de projet tiers (hors des 45 README)

[Wan2GP — guide du fork](https://github.com/Nikoju1977/Wan2GP/blob/main/GUIDE_UTILISATEUR.md) · [commit documentaire](https://github.com/Nikoju1977/Wan2GP/commit/9d53d8d1637a10a5484757c5e880b7be9a6a4b42) · [WanGP Community License 2.0](https://github.com/Nikoju1977/Wan2GP/blob/main/LICENSE.txt). Fork de DeepBeepMeep/WanGP, non revendiqué comme création originale ; restrictions commerciales et licences des modèles à respecter. README amont préservé.

[Preuves historiques](QUALITY_EVIDENCE.md). Les prototypes médicaux ne doivent pas servir à des décisions thérapeutiques. Les retours reproductibles respectent les licences individuelles.
