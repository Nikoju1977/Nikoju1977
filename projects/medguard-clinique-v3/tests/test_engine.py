import unittest
from backend.engine import check, normalize

SOURCE = {
    "id": "test", "title": "Référentiel synthétique de test", "version": "1.0",
    "reviewer": "Équipe de validation simulée", "reviewed": True,
    "content": "Le dispositif fictif X nécessite une vérification avant usage.\nNe pas utiliser le dispositif fictif Y.",
}

class EngineTests(unittest.TestCase):
    def test_exact_sentence_still_requires_human_review(self):
        result = check("Le dispositif fictif X nécessite une vérification avant usage.", [SOURCE])
        self.assertEqual(result["decision"], "HUMAN_REVIEW")
        self.assertEqual(result["summary"]["text_matches"], 1)

    def test_unsupported_claim_blocks(self):
        r = check("Le dispositif fictif X ne nécessite aucune vérification avant usage.", [SOURCE])
        self.assertEqual(r["decision"], "BLOCKED")
        self.assertNotEqual(r["claims"][0]["status"], "TEXT_MATCH")

    def test_negation_not_cleared_by_substring(self):
        r = check("Utiliser le dispositif fictif Y.", [SOURCE])
        self.assertEqual(r["decision"], "BLOCKED")

    def test_unreviewed_document_does_not_clear(self):
        doc = {**SOURCE, "reviewed": False}
        r = check("Le dispositif fictif X nécessite une vérification avant usage.", [doc])
        self.assertEqual(r["decision"], "BLOCKED")
        self.assertEqual(r["summary"]["accepted_sources"], 0)

    def test_changed_number_does_not_clear(self):
        doc = {**SOURCE, "content": "La mesure fictive prévue est de 5 mg."}
        r = check("La mesure fictive prévue est de 50 mg.", [doc])
        self.assertEqual(r["decision"], "BLOCKED")

    def test_empty_blocks(self):
        self.assertEqual(check("", [SOURCE])["decision"], "BLOCKED")

    def test_pii_blocks_even_textual_match(self):
        doc = {**SOURCE, "content": "Le contact de démonstration est test@example.org."}
        r = check("Le contact de démonstration est test@example.org.", [doc])
        self.assertEqual(r["decision"], "BLOCKED")
        self.assertGreater(len(r["privacy_flags"]), 0)

    def test_conflicting_sources_block_exact_match(self):
        a = {**SOURCE, "content": "La valeur fictive prévue est de 5 unités."}
        b = {**SOURCE, "id": "other", "content": "La valeur fictive prévue est de 50 unités."}
        r = check("La valeur fictive prévue est de 5 unités.", [a, b])
        self.assertEqual(r["decision"], "BLOCKED")
        self.assertEqual(r["claims"][0]["status"], "SOURCE_DISAGREEMENT")

    def test_sensitive_source_blocks(self):
        doc = {**SOURCE, "content": SOURCE["content"] + "\nContact: test@example.org"}
        result = check("Le dispositif fictif X nécessite une vérification avant usage.", [doc])
        self.assertEqual(result["decision"], "BLOCKED")

    def test_invalid_limits(self):
        with self.assertRaises(ValueError):
            check("a" * 100_001, [])

    def test_preserves_numbers_and_negation(self):
        self.assertNotEqual(normalize("ne pas administrer 10 mg"), normalize("administrer 10 mg"))
        self.assertNotEqual(normalize("dose 2,5 mg"), normalize("dose 25 mg"))

if __name__ == "__main__":
    unittest.main()
