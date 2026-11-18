# MEDGUARD CLINIQUE v2 — Présentation pour comité médical et responsable réglementaire

**STATUT : CANDIDAT À L'ÉVALUATION — AUCUN AGRÉMENT, MARQUAGE CE, ENDOSSEMENT OU VALIDATION CLINIQUE.**

## Destination d'usage proposée (périmètre R&D)

Démonstrateur logiciel d'analyse textuelle de sorties de modèles de langage : signaler l'absence de phrase identique à une référence **déclarée** revue, et imposer une revue humaine. Ne produit ni diagnostic, ni traitement, ni posologie, ni avis patient, ni validation de contenu clinique. Ne doit être employé qu'avec des textes **fictifs** durant cette phase.

Ce périmètre est une proposition de développement, non une exemption MDR garantie. En particulier, si le fabricant revendique le fait de rendre des conseils diagnostiques ou thérapeutiques plus sûrs pour une décision clinique, l'évaluation de la **qualification du logiciel** au sens du MDR est indispensable. La règle 11 du règlement (UE) 2017/745 traite notamment les logiciels qui fournissent des informations utilisées pour des décisions diagnostiques ou thérapeutiques : la classification et les éventuelles exceptions dépendent des risques et de l'usage visé.

## Logique de fonctionnement

1. Texte IA soumis à un corpus local de sources dont l'utilisateur **déclare** la relecture ; aucune authentification des références ou du professionnel dans cette version.
2. Matching textuel de phrases entières, avec normalisation mineure et détection limitée de divergences numériques / de négation.
3. Aucune phrase correspondante, ou suspicion de conflit => `BLOCKED`.
4. Toutes phrases correspondantes => `HUMAN_REVIEW` (pas de publication automatique).
5. Erreur / absence de réponse => blocage à implémenter côté application intégratrice (fail-closed).

Une correspondance littérale peut être erronée, obsolète, incomplète, hors contexte ou médicalement dangereuse. L'outil n'est **pas** un détecteur de vérité médicale.

## Processus de reconnaissance / adoption réaliste

- Coécrire la destination d'usage et les exclusions avec un référent médical (médecin hospitalier/qualité des soins), un juriste DM et un ingénieur qualité.
- Établir la qualification et la classe réglementaire (MDR/AI Act) ; déterminer le besoin d'organisme notifié et la procédure de marquage CE ; aucune marque CE à afficher sans conformité.
- Constituer le système qualité et la gestion des risques : normes pertinentes à évaluer avec les spécialistes (p. ex. ISO 14971, IEC 62304, IEC 82304-1, ISO 13485 selon portée).
- Établir un protocole scientifique avec comité multidisciplinaire ; jeux de cas conçus indépendamment du développement et annotés par au moins deux experts.
- Mesurer les taux d'erreurs dangereuses non bloquées, les erreurs de blocage, l'efficacité de l'abstention, la variabilité clinique (indication, population, dose, durée, interactions, grossesse, insuffisance rénale, différences de contexte).
- Prévoir un examen de sécurité, de protection des données, de robustesse, de cybersécurité et de surveillance post-mise-sur-le-marché si applicable.
- Soumettre l'évaluation technique et clinique aux professionnels / organismes compétents avant tout déploiement clinique ; la HAS n'« approuve » pas automatiquement toutes les applications et le marquage CE n'équivaut pas à un avis favorable de remboursement.

## Protocole d'essai proposé — À faire approuver

| Dimension | Exemple de critère à définir avec cliniciens |
| --- | --- |
| Ensemble d'évaluation | Cas synthétiques multi-spécialités, avec cas adversariaux, hors distribution et documents périmés |
| Évaluation du prétraitement | Vérifier segmentation des phrases et stabilité des caractères / unités / négations |
| Faux passages critiques | Compter les affirmations dangereuses non bloquées ; définir une tolérance et intervalle de confiance avant essais |
| Erreurs de blocage | Mesurer les affirmations valides inutilement bloquées, sans compromettre la sécurité |
| Performance d'équipe | Comparer travail humain seul / assisté ; vigilance, fatigue, temps de revue et surconfiance |
| Gouvernance des sources | Provenance vérifiable, date, version, responsable médical, mise à jour et retrait rapide |
| Impact organisationnel | Identifier qui peut confirmer une réponse, selon quel circuit d'autorisation et quelles preuves |

Aucun résultat n'est revendiqué pour ces critères : **l'étude n'a pas eu lieu**.

## Références

- MDR (UE) 2017/745, notamment annexe VIII règle 11 : https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=celex:32017R0745
- HAS — technologies numériques et IA à usage professionnel : https://www.has-sante.fr/jcms/p_3363066/fr/dispositifs-medicaux-numeriques-a-usage-professionnel
- HAS — guide d'aide au choix : https://www.has-sante.fr/jcms/p_3448941/fr/dispositifs-medicaux-numeriques-a-usage-professionnel-guide-d-aide-au-choix-a-destination-des-professionnels-et-des-etablissements-de-sante
- HAS — premières clefs d'usage de l'IA générative en santé : https://www.has-sante.fr/jcms/p_3703115
- AI Act consolidé, règlement UE 2024/1689 et règlement UE 2026/1744 : https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng

Avertissement : interprétation de classification réglementaire à confirmer par un spécialiste selon la destination d'usage finale.
