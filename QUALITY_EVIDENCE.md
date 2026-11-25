# Studio Niko — preuves de qualité

Instantané du 25 novembre 2026. [Campagne GitHub Actions](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/actions/runs/45517645580) : **53 dépôts recensés, 4 633 fichiers, 1 560 lots, 52 contrôles d’intégrité Docker réussis**. 51 audits complets dans le périmètre admissible, 1 partiel, 1 dépôt vide. Le workflow global est en échec en raison de la couverture partielle Wan2GP. Les dépôts privés sont exclus. Les alertes sont historiques, heuristiques pour la plupart, et ne constituent pas des vulnérabilités confirmées. Les statuts ci-dessous ne décrivent pas la production actuelle.

## Comparaisons fonctionnelles réelles

| Projet | Scénario ciblé | Correctif | Preuve |
|---|---|---|---|
| [the-lovestronautes-machine](https://github.com/Nikoju1977/the-lovestronautes-machine) | Restauration des boucles musicales | [Commit](https://github.com/Nikoju1977/the-lovestronautes-machine/commit/d5436d4af6c0a53d28bbfe9b66d05546295668d2) · [PR](https://github.com/Nikoju1977/the-lovestronautes-machine/pull/31) | [Avant échec / après réussite](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/actions/runs/45517345460) |
| [job-search](https://github.com/Nikoju1977/job-search) | Fermeture du dialogue PWA | [Commit](https://github.com/Nikoju1977/job-search/commit/7839af7161eff01339eeff7d2d49f57f11782865) · [PR](https://github.com/Nikoju1977/job-search/pull/17) | [Avant échec / après réussite](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/actions/runs/45517856039) |
| [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai) | Sources documentaires indisponibles | [Commit](https://github.com/Nikoju1977/medicalvisionproai/commit/4fecc4ae59cff6d7e71f51f7be15a53896f39b67) · [PR](https://github.com/Nikoju1977/medicalvisionproai/pull/16) | [Avant échec / après réussite](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/actions/runs/45517856039) |
| [Nikoju1977](https://github.com/Nikoju1977/Nikoju1977) | Imports simultanés et sauvegarde | [Commit](https://github.com/Nikoju1977/Nikoju1977/commit/a96eb662c6ea1a6b1a78ef16e675a0eea6082a10) · [PR](https://github.com/Nikoju1977/Nikoju1977/pull/5) | [Avant échec / après réussite](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/actions/runs/45517856039) |

Ces tests ciblés ne prouvent ni le fonctionnement complet de l'application ni la fusion/déploiement du correctif. [CI de Code Mode Pro V24](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/actions/runs/45518330974) réussie.

## Inventaire des preuves par dépôt

| Dépôt et commit examiné | Fichiers | Lots | Alertes initiales | Docker intégrité | Couverture |
|---|---:|---:|---:|---|---|
| [aegis-earth-mobile](https://github.com/Nikoju1977/aegis-earth-mobile/commit/8c6ab9536e7512e9650e7c32c4f310f4ce87785a) | 16 | 6 | 24 | Réussi | Périmètre admissible |
| [agent-biometrique](https://github.com/Nikoju1977/agent-biometrique/commit/bd97d7efb93c891450418c92e9d903d48ad31780) | 7 | 3 | 9 | Réussi | Périmètre admissible |
| [applewatchcadrans](https://github.com/Nikoju1977/applewatchcadrans/commit/fe61abfa051f979cf944c93763762741732ddd9e) | 6 | 2 | 15 | Réussi | Périmètre admissible |
| [AutoCoder-Studio-Niko](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/commit/f825e7debc84dc11acd54e9500210d010e7525e3) | 27 | 9 | 2 | Réussi | Périmètre admissible |
| [AutoEntrepreneur-1M](https://github.com/Nikoju1977/AutoEntrepreneur-1M/commit/05c8209fa12cbe25e46a3959d73f3cde6bc60930) | 1074 | 358 | 5 | Réussi | Périmètre admissible |
| [aylina-is-cooking](https://github.com/Nikoju1977/aylina-is-cooking/commit/81cf11120d6ff43ec5389677dadc547809d65040) | 6 | 2 | 4 | Réussi | Périmètre admissible |
| [Bouh-delivery](https://github.com/Nikoju1977/Bouh-delivery/commit/d15e19c8b9eb6b8201c953ad72d5d57b36eeac07) | 9 | 3 | 0 | Réussi | Périmètre admissible |
| [Boutique-morgane](https://github.com/Nikoju1977/Boutique-morgane/commit/97fa7697193cc3b515daaff0b9ceed75f6706d2c) | 42 | 14 | 6 | Réussi | Périmètre admissible |
| [cockpit-mecaria](https://github.com/Nikoju1977/cockpit-mecaria/commit/c636d4829cf350eb767c6d1685138b98dff786ee) | 5 | 2 | 7 | Réussi | Périmètre admissible |
| [compagnon-diabete](https://github.com/Nikoju1977/compagnon-diabete/commit/84b78232c910053ce9acb20c5d3ee616bdd67e61) | 6 | 2 | 1 | Réussi | Périmètre admissible |
| [Cosmo-citrouille](https://github.com/Nikoju1977/Cosmo-citrouille/commit/374a0925ffe9f5646cf0c959d14f67ff7fd9e2cc) | 18 | 6 | 12 | Réussi | Périmètre admissible |
| [Dbmetre-pro](https://github.com/Nikoju1977/Dbmetre-pro/commit/a25beb1d9e1b8f29c0c74ad9ab641553fa1e2596) | 5 | 2 | 0 | Réussi | Périmètre admissible |
| [dermato-ai](https://github.com/Nikoju1977/dermato-ai/commit/eeef37620134b807c33e915bf4ffdc1ea020ae0f) | 6 | 2 | 7 | Réussi | Périmètre admissible |
| [EBM-BRETONNE.](https://github.com/Nikoju1977/EBM-BRETONNE./commit/1861a9d88be8f116de274b6d622ff7b364006835) | 7 | 3 | 14 | Réussi | Périmètre admissible |
| [fibrobot](https://github.com/Nikoju1977/fibrobot/commit/12bd9ed9e371cbe56a0513f46908c4bd7886e0c2) | 97 | 33 | 0 | Réussi | Périmètre admissible |
| [fibrocare](https://github.com/Nikoju1977/fibrocare/commit/887ff95b8a98902dbd635fed3bff586b17efc31c) | 6 | 2 | 12 | Réussi | Périmètre admissible |
| [galerie-studio-niko](https://github.com/Nikoju1977/galerie-studio-niko/commit/ca453f882c238e0421179308556cb5a87d874b1c) | 44 | 15 | 26 | Réussi | Périmètre admissible |
| [handimonde](https://github.com/Nikoju1977/handimonde/commit/76091a200024c8fa54c7d71923132d5275df9bb7) | 11 | 4 | 21 | Réussi | Périmètre admissible |
| [ia-studio-cine](https://github.com/Nikoju1977/ia-studio-cine/commit/b6a61286dc2b320f2b6aa3f30d8480c8b02ec96b) | 50 | 17 | 8 | Réussi | Périmètre admissible |
| [jarvisdiabete](https://github.com/Nikoju1977/jarvisdiabete/commit/e84ebca7a31270a305522dde1a963770fda85000) | 49 | 17 | 0 | Réussi | Périmètre admissible |
| [job-search](https://github.com/Nikoju1977/job-search/commit/722c41fcb411fca5321feecf7d2d012b5f124626) | 86 | 29 | 7 | Réussi | Périmètre admissible |
| [l-ultime-confrontation](https://github.com/Nikoju1977/l-ultime-confrontation/commit/7cda371d732e37f0903c97d1bbbb95526a3d986b) | 5 | 2 | 0 | Réussi | Périmètre admissible |
| [le-jardin-de-niko](https://github.com/Nikoju1977/le-jardin-de-niko/commit/1fbe50238e980572a931ff12b35c698ccf265ebf) | 5 | 2 | 20 | Réussi | Périmètre admissible |
| [les-annales-akashiques](https://github.com/Nikoju1977/les-annales-akashiques/commit/bb891ffd43e03c4befa097a6127c4a2d92251dc8) | 5 | 2 | 11 | Réussi | Périmètre admissible |
| [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai/commit/c27defd2f121234bfd06b389a8fd068e6fc9d6cf) | 36 | 12 | 26 | Réussi | Périmètre admissible |
| [Medivision-ai-pro](https://github.com/Nikoju1977/Medivision-ai-pro/commit/8e49181991fe46073c89cdd8c992fc1ebf150088) | 22 | 8 | 1 | Réussi | Périmètre admissible |
| [Metrology-OS](https://github.com/Nikoju1977/Metrology-OS/commit/33c36f4e409637b2df7ddfde71ba057cad0e6087) | 5 | 2 | 30 | Réussi | Périmètre admissible |
| [miaotris](https://github.com/Nikoju1977/miaotris/commit/d62430eb026099fc78c687fa13f64382d75f56cb) | 11 | 4 | 6 | Réussi | Périmètre admissible |
| [N8V](https://github.com/Nikoju1977/N8V/commit/df503858c3a6206ccc31f7c1ac02f9b8d4e794bf) | 6 | 2 | 0 | Réussi | Périmètre admissible |
| [Neural-Art-mars-2026](https://github.com/Nikoju1977/Neural-Art-mars-2026/commit/ff745ae4dbe3132204ed5d5ad1941745f91d6a45) | 11 | 4 | 0 | Réussi | Périmètre admissible |
| [niko-commande-live-tik-tok](https://github.com/Nikoju1977/niko-commande-live-tik-tok/commit/c1a71b0ef24b1b7958334a1e881b7583a8502274) | 9 | 3 | 0 | Réussi | Périmètre admissible |
| [niko-music-lab](https://github.com/Nikoju1977/niko-music-lab/commit/fb79ce80f954a7b9033b80818db852aba6be8f93) | 5 | 2 | 9 | Réussi | Périmètre admissible |
| [Niko-Ultravision](https://github.com/Nikoju1977/Niko-Ultravision/commit/7a5cd405ca1f182a069ae92f7a7ee5081fdda6b7) | 76 | 26 | 0 | Réussi | Périmètre admissible |
| [Nikoassist](https://github.com/Nikoju1977/Nikoassist/commit/eb18f0d8ec8c1256e377a76e85c1f5568c605857) | 47 | 16 | 1 | Réussi | Périmètre admissible |
| [nikogroove](https://github.com/Nikoju1977/nikogroove/commit/5914a587ddeb22a85636b3d082f5ded9dba980b5) | 5 | 2 | 9 | Réussi | Périmètre admissible |
| [Nikoju1977](https://github.com/Nikoju1977/Nikoju1977/commit/e9b456a7ec5f84cb5b519fb08cd5c47c476657bb) | 72 | 24 | 5 | Réussi | Périmètre admissible |
| [oeil-hermes](https://github.com/Nikoju1977/oeil-hermes/commit/016546711dec7ce6fb9809ce399ca13ea0f23eee) | 8 | 3 | 4 | Réussi | Périmètre admissible |
| [OPENVITA-DT1](https://github.com/Nikoju1977/OPENVITA-DT1/commit/0526102639b8ce018fea94103bd598b6ba2971aa) | 6 | 2 | 7 | Réussi | Périmètre admissible |
| [oracle-du-jardinier](https://github.com/Nikoju1977/oracle-du-jardinier/commit/6e7dc2e41a01c0b652a55116fa0c5cf350dc89b3) | 9 | 3 | 69 | Réussi | Périmètre admissible |
| [presentation-medtronic](https://github.com/Nikoju1977/presentation-medtronic/commit/c21a2a277c64bae34bd8823a87395a435caae417) | 7 | 3 | 0 | Réussi | Périmètre admissible |
| [purescanai](https://github.com/Nikoju1977/purescanai/commit/2e98ac00b2cf51c1365dfebf9e308204c169bc52) | 7 | 3 | 7 | Réussi | Périmètre admissible |
| [radar-de-niko](https://github.com/Nikoju1977/radar-de-niko/commit/a67106a76b496e6bd9bb17b4d69989ddeceeb170) | 34 | 12 | 0 | Réussi | Périmètre admissible |
| [Rave-Generator-2](https://github.com/Nikoju1977/Rave-Generator-2/commit/121538cbc225ff43699a04f1e0068593721fd371) | 8 | 3 | 10 | Réussi | Périmètre admissible |
| [rf-metrolgy-pro](https://github.com/Nikoju1977/rf-metrolgy-pro) | 0 | 0 | 0 | Sans objet | Vide |
| [RF-Metrology-Pro](https://github.com/Nikoju1977/RF-Metrology-Pro/commit/0cf3e08cd3bd3e2ac0d5de324888a7e5fec8fec9) | 14 | 5 | 0 | Réussi | Périmètre admissible |
| [Ron-](https://github.com/Nikoju1977/Ron-/commit/23836a9c4aa7eaa56f53510cbcdaccdd35ce717a) | 48 | 16 | 57 | Réussi | Périmètre admissible |
| [Sage-companion](https://github.com/Nikoju1977/Sage-companion/commit/b7d63f7a4a1b241a4e12be3cd6abe60e58280877) | 7 | 3 | 3 | Réussi | Périmètre admissible |
| [SCAN-BIOMEDICAL](https://github.com/Nikoju1977/SCAN-BIOMEDICAL/commit/f4bd72e4e2f9f9e9b94eaae9231c4388c02be729) | 7 | 3 | 7 | Réussi | Périmètre admissible |
| [tarot-de-niko](https://github.com/Nikoju1977/tarot-de-niko/commit/7a6de7e1efea72f27b20813bacfd129c337efe3a) | 24 | 8 | 0 | Réussi | Périmètre admissible |
| [the-lovestronautes-machine](https://github.com/Nikoju1977/the-lovestronautes-machine/commit/3903bb23403db04bb4f27e9cf840b837dc4f6ff2) | 64 | 22 | 45 | Réussi | Périmètre admissible |
| [Vision-IA](https://github.com/Nikoju1977/Vision-IA/commit/422e0ea150ee961a263c55c0e88fec3cca5539f7) | 25 | 9 | 12 | Réussi | Périmètre admissible |
| [Wan2GP](https://github.com/Nikoju1977/Wan2GP/commit/a02526122d204caa1efcf7ac76d7075fc7224c0b) | 2436 | 812 | 370 | Réussi | Partielle |
| [White-hat](https://github.com/Nikoju1977/White-hat/commit/269e707b8072170553f0b4ee9b78112b0b27291e) | 32 | 11 | 3 | Réussi | Périmètre admissible |

## Points ouverts

Wan2GP : [contrôle ciblé](https://github.com/Nikoju1977/AutoCoder-Studio-Niko/actions/runs/45518107709) de 12 rejets : 10 faux positifs BOM résolus par correction de l'auditeur, 2 rejets persistants (indentation Python et script Gradio), 2 fichiers >1 Mio. Le tableau garde les alertes initiales, sans réécrire l'historique. Les tests de navigation, les tests sur appareils physiques et les déploiements ne sont pas certifiés par cette campagne.

## Publication des correctifs — instantané du 25 novembre 2026

Quatre correctifs fusionnés et CI réussies après fusion. Les deux déploiements Pages sont confirmés par les journaux pour les commits exacts ; aucune validation HTTP de la révision ou sur appareils physiques.

| Projet | Commit de fusion | CI | Publication |
|---|---|---|---|
| [the-lovestronautes-machine](https://github.com/Nikoju1977/the-lovestronautes-machine/pull/31) | [ca0a8e58](https://github.com/Nikoju1977/the-lovestronautes-machine/commit/ca0a8e589ca9b9e9dd1d06d31279df446fc63421) | [Réussie](https://github.com/Nikoju1977/the-lovestronautes-machine/actions/runs/45520549669) | [Pages réussie](https://github.com/Nikoju1977/the-lovestronautes-machine/actions/runs/45520549011) · [Incident du workflow personnalisé](https://github.com/Nikoju1977/the-lovestronautes-machine/actions/runs/45520549762) |
| [job-search](https://github.com/Nikoju1977/job-search/pull/17) | [db7f3f4f](https://github.com/Nikoju1977/job-search/commit/db7f3f4fd0a6e3b6dc8d0e6e9e51575bc45c532d) | [Réussie](https://github.com/Nikoju1977/job-search/actions/runs/45520568481) | Non confirmée |
| [medicalvisionproai](https://github.com/Nikoju1977/medicalvisionproai/pull/16) | [85942d85](https://github.com/Nikoju1977/medicalvisionproai/commit/85942d8518aae49efa60da692a4453130e8d3c04) | [Réussie](https://github.com/Nikoju1977/medicalvisionproai/actions/runs/45520582551) | [Pages réussie](https://github.com/Nikoju1977/medicalvisionproai/actions/runs/45520581607) |
| [Nikoju1977](https://github.com/Nikoju1977/Nikoju1977/pull/6) | [693bcbe0](https://github.com/Nikoju1977/Nikoju1977/commit/693bcbe014ab1a85c15f345630f5f6631414f16f) | [Réussie](https://github.com/Nikoju1977/Nikoju1977/actions/runs/45518869495) | Non confirmée |

Le workflow Pages natif de la machine musicale a réussi après l'échec du workflow personnalisé sur le même commit. L'artefact de ce dernier est apparu après l'erreur. Pas de changement de configuration Pages sans confirmation de la source de publication. Le quota Vercel empêche actuellement de nouvelles publications via API.
