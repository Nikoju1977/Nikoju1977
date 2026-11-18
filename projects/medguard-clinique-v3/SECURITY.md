# Politique de sécurité — prototype

Ne pas soumettre de données patient, identifiants réels, jetons, secrets ou dossiers médicaux aux issues publiques. Pour signaler un défaut, utilisez un canal privé avec le mainteneur du dépôt (GitHub security advisory si activé). Aucun niveau de service de résolution ni certification de sécurité ne sont revendiqués.

L'API doit rester sur `127.0.0.1`, et les clés doivent être fournies par variable d'environnement, jamais commitées. Aucune autorisation clinique ne découle d'une réponse API. Ne pas exposer directement le port 8000 sur Internet. Les logs d'application appelante doivent être filtrés des textes médicaux.
