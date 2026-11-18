# Projet de protocole de validation clinique — à soumettre à un comité médical

**Non commencé / à valider** : ce document est une proposition de méthode, pas un résultat clinique.

## Question
Le garde-fou diminue-t-il, pour une tâche médicalement définie, le taux de réponses inexactes effectivement exposées à l'utilisateur comparativement à un même système d'IA sans le garde-fou ? Il peut aussi bloquer des réponses valides ; les deux effets doivent être mesurés.

## Gouvernance
Nommer un investigateur médical, DPO et responsable qualité, déclarer la destination d'usage, étudier l'approbation éthique/réglementaire requise, enregistrer protocole et critères avant l'étude. Séparer construction, validation et jeu de test clinique indépendant.

## Jeu d'épreuves / annotation
- Cas synthétiques et, seulement sous cadre légal validé, cas cliniques dé-identifiés ou sous gouvernance appropriée.
- Affecter un identifiant pseudonymisé et une référence clinique datée à chaque cas (pas dans les journaux bruts).
- Ajouter des confusions entre unité, décimale, négation, posologie, contre-indication, âge, grossesse, fonction rénale, interactions, allergies, langue et contexte.
- Produire des annotations indépendantes par deux cliniciens ; arbitrer les désaccords, enregistrer la spécialité et l'incertitude.
- Échantillonner aussi les réponses correctes, pour ne pas évaluer seulement les erreurs.

## Indicateurs préspécifiés (sans seuil arbitraire inventé)
- **Taux d'erreurs dangereuses exposées** après garde-fou / avant garde-fou, avec intervalle de confiance.
- Sensibilité de blocage des erreurs cliniquement significatives et des omissions, calculée par spécialité et sous-groupe.
- Taux de blocage injustifié des réponses valides, délai et charge de relecture par clinicien.
- Faux négatifs critiques, discordance inter-annotateurs, coût/latence et stabilité entre mises à jour.
- Sécurité, explicabilité, traçabilité et acceptabilité utilisateur.

## Conditions d'arrêt
Arrêter la validation en cas de fuite de données, défaut grave d'authentification, source corrompue non bloquée, faux négatifs critiques répétés ou usage clinique non autorisé.

**Situation actuelle** : aucune étude n'a commencé ; aucun taux de performance médicale n'a été mesuré.
