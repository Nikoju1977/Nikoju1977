# MEDGUARD CLINIQUE V3 — Pare-feu de provenance des réponses IA (prototype)

> **NON AUTORISÉ POUR LES SOINS — NE PAS UTILISER AVEC DE VRAIES DONNÉES PATIENT.**
> Ce logiciel n'est pas certifié RGPD, ni HDS, ni marqué CE, ni validé cliniquement, ni approuvé par un organisme médical.

## Ce qui distingue la V3

MEDGUARD se place entre un modèle de langage et l'application destinataire. Il ne crée **aucune réponse médicale** ; il compare la sortie à des phrases extraites de documents mis à disposition de l'outil. Une phrase sans preuve textuelle exacte est bloquée. Même une correspondance exacte ne donne **jamais** un statut `APPROVED` : uniquement `HUMAN_REVIEW`.

Le **mode API v3** exige, en plus, que chaque document soit présent dans un registre administré (`config/approved_sources.json`), avec un identifiant, une version et un contenu dont la somme SHA-256 correspond, une déclaration de revue, des dates valides, et une URL HTTPS. **Le registre fourni est vide** ; il bloque donc tout jusqu'à ce que des références appropriées soient auditées et ajoutées. La présence d'un document dans le registre ne prouve pas sa véracité clinique, et le registre n'est pas signé.

| Capacité | Mode V3 API | Mode navigateur / V2 héritée |
|---|---|---|
| Correspondance littérale phrase par phrase | Oui | Oui |
| Blocage des phrases non retrouvées | Oui | Oui |
| Correspondance SHA-256 avec registre administré | Oui | Non |
| Sources périmées/rejetées, identifiant dupliqué | Oui | Non |
| Signatures de certaines injections dans les sources | Oui | Non |
| Revue médicale humaine toujours nécessaire | Oui | Oui |
| Authenticité réelle des recommandations et identité du médecin | Non | Non |
| Contradictions complexes / omissions / posologies cliniques | Non | Non |
| Conformité RGPD, CE, HDS et validation clinique | **Non** | **Non** |

## Installation et utilisation en local

La démo navigateur hors ligne est dans `MEDGUARD_AI_Autonome.html`. Elle utilise **le mode laboratoire**, avec sources **déclaratives**, et ne représente pas la politique de confiance v3 du serveur.

Prérequis API : Python 3.11+.

```bash
python3 -m pip install -r requirements.txt
export MEDGUARD_API_KEY="$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')"
python3 -m uvicorn backend.api:app --host 127.0.0.1 --port 8000 --no-access-log
```

Sous Windows, utiliser `run_windows.bat` pour lancer un environnement de test avec une clé éphémère. Par défaut, aucune source n'est approuvée. Envoyer le fichier synthétique `examples/request.json` :

```bash
curl --fail-with-body -X POST http://127.0.0.1:8000/api/v3/check \
  -H "X-API-Key: $MEDGUARD_API_KEY" -H 'Content-Type: application/json' \
  --data-binary @examples/request.json
```

Une réponse HTTP 200 avec `"decision":"BLOCKED"` est **attendue** lorsque le registre de sources est vide. `HUMAN_REVIEW` exige une preuve inscrite au registre et ne vaut pas validation médicale. En cas de 401/503, timeout ou JSON inattendu, l'intégration appelante doit **bloquer** le message. Le chemin `/api/v2/check` conserve les compatibilités de démonstration, ne doit pas être utilisé en soins.

### Ajouter une référence au registre (uniquement après revue externe)

Chaque objet `sources` dans `config/approved_sources.json` possède au minimum :

```json
{
  "id": "ref-approved-by-clinical-committee",
  "title": "Référence officielle vérifiée hors programme",
  "version": "2026-11",
  "reviewer": "Identité validée dans un système externe",
  "source_url": "https://example.org/official-source",
  "sha256": "<64 caractères hexadécimaux : SHA-256 du contenu exact UTF-8>",
  "reviewed_at": "2026-11-18",
  "expires_at": "2027-02-18",
  "approved": true
}
```

Les entrées ci-dessus sont **un exemple de schéma non fonctionnel**, pas une source médicale réelle. Ne pas les copier dans le registre de production sans vérification professionnelle. Le lien HTTPS et le hash n'authentifient ni l'auteur ni l'exactitude médicale du document.

## Tests reproductibles

```bash
python3 -m unittest discover -s tests -v
node --test tests/engine.test.js
node --check web/engine.js
node --check web/app.js
python3 tools/build_standalone.py
```

Les tests ne constituent ni une preuve de pertinence clinique, ni une validation GDPR/RGPD. Résultats documentés dans `TEST_REPORT.md`, limites dans `docs/ARCHITECTURE_ET_MENACES.md`, proposition d'évaluation dans `docs/PROTOCOLE_VALIDATION_CLINIQUE.md`.

## Périmètre de sécurité et RGPD

- Démonstration offline : pas de serveur distant ni de télémétrie dans l'application web. Les données restent en mémoire de la page (des traces peuvent néanmoins exister hors application sur le poste ou le navigateur).
- API : écoute sur localhost uniquement, clé d'API obligatoire, restriction des origines/noms d'hôte, en-têtes anti-cache, aucune journalisation de payload dans ce code. Les applications intégratrices doivent vérifier leur propre journalisation.
- Les contrôles de PII sont partiels (e-mail / téléphone FR / NIR) et ne réalisent **pas** une anonymisation fiable.
- Aucune certification, audit indépendant, revue DPO, qualification MDR, hébergement HDS, authentification Pro Santé Connect, registre de consentement, module de décision médicale ou intégration clinique n'est fourni.

## Parcours avant toute commercialisation ou utilisation clinique

1. Définir une **destination d'usage** et faire qualifier le logiciel au titre du MDR / AI Act par des spécialistes.
2. Constituer un comité médical, un registre de sources administré et un protocole d'étude indépendant avec cas adversariaux et cas valides.
3. Faire évaluer RGPD / AIPD, architecture HDS selon flux réels, IAM, rétention, tests d'intrusion et gouvernance cyber.
4. Mettre en place gestion du cycle logiciel/risque adaptée, surveillance et contrôles indépendants avant tout déploiement clinique.

## Références institutionnelles

- CNIL — IA et santé : https://www.cnil.fr/fr/ia-et-sante-developper-et-evaluer-des-systemes-ia-conformes
- CNIL — AIPD : https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd
- HAS — dispositifs médicaux numériques à usage professionnel : https://www.has-sante.fr/jcms/p_3363066/fr/dispositifs-medicaux-numeriques-a-usage-professionnel
- ANS — hébergement HDS : https://esante.gouv.fr/labels-certifications/hds/certification-des-hebergeurs-de-donnees-de-sante
- OWASP — Top 10 des risques LLM : https://owasp.org/www-project-top-10-for-large-language-model-applications/

## Licence

Voir `LICENSE`. MEDGUARD est fourni tel quel, **pour recherche et démonstration**, sans garantie ni autorisation de l'employer pour une décision de santé.
