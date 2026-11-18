# MEDGUARD CLINIQUE V3 — Architecture de confiance et modèle de menace

**Périmètre : prototype d'évaluation, sans usage patient.**

## Chaîne de décision

```
Application appelante (IA, RAG, etc.)
  -> authentification X-API-Key (développement local)
  -> validation schéma + limites taille
  -> registre de sources administré (liste blanche)
  -> concordance identité/version/empreinte SHA-256/date/URL HTTPS
  -> filtrage conservateur de certaines injections et identifiants
  -> comparaison textuelle phrase par phrase (aucune inférence clinique)
  -> BLOCKED ou HUMAN_REVIEW
  -> application appelante ne montre rien sans revue explicite
```

Le registre de production est **vide**. Le statut `HUMAN_REVIEW` n'est possible qu'avec au moins une référence préalablement inscrite par un responsable, avec empreinte égale et date valide. Ce n'est **jamais** un feu vert médical. Si le registre est absent ou invalide, l'API v3 renvoie HTTP 503 ; l'application appelante doit le traiter comme un blocage. Le endpoint `v2` demeure pour la **recherche/démonstration**, il ne possède pas ce contrôle de provenance.

## Limites de la menace

| Risque | Contrôle existant | Limite / travail à mener |
| --- | --- | --- |
| Hallucination non copiée | correspondance textuelle exacte ou blocage | une phrase copiée peut être factuellement fausse ou hors contexte |
| Source inventée | registre versionné, titre/relecteur canonique, SHA-256 | registre non signé et non audité par un tiers |
| Modification silencieuse du corpus | SHA-256 de chaque contenu comparé au registre | protection de la machine et du fichier non assurée |
| Source périmée | dates explicites, expiration obligatoire | la date n'établit pas une révision médicale réelle |
| Prompt injection | signatures conservatrices dans réponse et sources | jamais exhaustive, formulations inédites possibles |
| PII | motifs e-mail / téléphone / NIR | noms, adresses, récits et données indirectes peuvent échapper aux contrôles |
| Accès API | clé obligatoire, écoute localhost, origine/host stricts | pas de SSO, mTLS, rôles, rotation centralisée ou examen de sécurité |
| Sorties non revues | seul `BLOCKED` / `HUMAN_REVIEW` | aucune signature d'approbation professionnelle intégrée |
| Exfiltration | interface offline sans API externe | traces OS, navigateur, poste, autre produit et réseau à évaluer |
| Déni de service | limites de charge annoncées | audit charge et limite effective flux HTTP non finalisés |

## Procédure pour une nouvelle source

1. Obtenir la source par un canal officiel et vérifier l'authenticité (hors programme).
2. Définir son domaine d'applicabilité, son auteur, sa date de validité et ses contre-indications.
3. Obtenir une revue indépendante, documentée et versionnée par un professionnel habilité.
4. Produire l'empreinte SHA-256 du texte UTF-8 **exact** et créer une entrée dans `config/approved_sources.json` via une proposition de modification revue par deux personnes.
5. Tester l'intégrité, la pertinence, les déviations de nombres, les négations et les contradictions dans les essais.
6. Prévoir une expiration, un retrait d'urgence et la révocation en cas de nouvelle recommandation.

Aucune véritable source médicale n'est distribuée dans ce projet. Les données de démonstration sont synthétiques.

## Architecture production proposée (non implémentée)

- Registre signé hors bande (ex. signatures Ed25519) et revue indépendante ; audit append-only avec ancrage horodaté.
- Authentification Pro Santé Connect si disponible / adaptée ; contrôle RBAC, sessions, révocation, supervision et journalisation minimisée.
- Trafic TLS/mTLS, segmentation des services, politique rétention et environnement HDS si requis.
- Vérification sémantique multi-étages calibrée sur corpus clinique : extraction des assertions, NLI, recherche contradictoire et contrôles de calcul des posologies à partir de règles expertisées.
- Gestion contextuelle des populations et indications, sources normalisées, système de revue humain tracé.
- Validation IEC 62304 / ISO 14971 / ISO 13485 selon qualification produit et risques, au-delà de la simple conception logicielle.

**Références de conception** : CNIL AIPD, cadre RGPD UE, HAS dispositifs médicaux numériques, OWASP Top 10 LLM (2025). Ces références n'autorisent aucune assertion de conformité.
