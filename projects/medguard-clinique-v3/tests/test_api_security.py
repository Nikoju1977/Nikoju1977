import os
import unittest
from unittest.mock import patch
from fastapi.testclient import TestClient
from backend.api import app

GOOD_KEY = 'a' * 40
SOURCE = {'id':'s', 'title':'Référence de test','version':'v1','reviewer':'Contrôle fictif','reviewed':True,'content':'Le matériel fictif doit être contrôlé.'}
DATA = {'answer':'Le matériel fictif doit être contrôlé.', 'sources':[SOURCE]}

class ApiSecurityTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_is_accurate_about_certification(self):
        r = self.client.get('/health')
        self.assertEqual(r.status_code,200)
        self.assertFalse(r.json()['medical_validation'])
        self.assertFalse(r.json()['regulatory_certification'])
        self.assertEqual(r.headers['cache-control'],'no-store, max-age=0')

    def test_no_key_config_disables_api(self):
        with patch.dict(os.environ, {'MEDGUARD_API_KEY':''}):
            r=self.client.post('/api/v2/check', json=DATA)
        self.assertEqual(r.status_code,503)

    def test_wrong_key_is_unauthorized(self):
        with patch.dict(os.environ, {'MEDGUARD_API_KEY':GOOD_KEY}):
            r=self.client.post('/api/v2/check', json=DATA, headers={'X-API-Key':'bad'})
        self.assertEqual(r.status_code,401)

    def test_correct_key_requires_human_review(self):
        with patch.dict(os.environ, {'MEDGUARD_API_KEY':GOOD_KEY}):
            r=self.client.post('/api/v2/check', json=DATA, headers={'X-API-Key':GOOD_KEY})
        self.assertEqual(r.status_code,200)
        self.assertEqual(r.json()['decision'],'HUMAN_REVIEW')
        self.assertEqual(r.headers['x-content-type-options'],'nosniff')

    def test_legacy_endpoint_is_also_secured(self):
        with patch.dict(os.environ, {'MEDGUARD_API_KEY':GOOD_KEY}):
            r=self.client.post('/api/v1/check', json=DATA)
        self.assertEqual(r.status_code,401)

    def test_cross_site_origin_is_rejected(self):
        with patch.dict(os.environ, {'MEDGUARD_API_KEY':GOOD_KEY}):
            r=self.client.post('/api/v2/check', json=DATA, headers={'Origin':'https://not-trusted.example','X-API-Key':GOOD_KEY})
        self.assertEqual(r.status_code,403)

    def test_wrong_media_type_is_rejected(self):
        r=self.client.post('/api/v2/check', content='x', headers={'Content-Type':'text/plain'})
        self.assertEqual(r.status_code,415)

    def test_trusted_host_rejects_remote(self):
        r=self.client.get('/health',headers={'host':'not-local.example'})
        self.assertEqual(r.status_code,400)

    def test_extra_fields_are_rejected(self):
        with patch.dict(os.environ, {'MEDGUARD_API_KEY':GOOD_KEY}):
            r=self.client.post('/api/v2/check', json={**DATA,'secret-extra':'z'}, headers={'X-API-Key':GOOD_KEY})
        self.assertEqual(r.status_code,422)

if __name__=='__main__':
    unittest.main()
