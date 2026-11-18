#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
python3 -m pip install -r requirements.txt
if [ -z "${MEDGUARD_API_KEY:-}" ]; then
  MEDGUARD_API_KEY="$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')"
  export MEDGUARD_API_KEY
  printf 'Secret API local (à conserver privé) : %s\n' "$MEDGUARD_API_KEY"
fi
python3 -m uvicorn backend.api:app --host 127.0.0.1 --port 8000 --no-access-log
