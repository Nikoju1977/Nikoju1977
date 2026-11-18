@echo off
setlocal
cd /d "%~dp0"
py -m pip install -r requirements.txt
if not defined MEDGUARD_API_KEY (
  for /f "delims=" %%i in ('py -c "import secrets;print(secrets.token_urlsafe(32))"') do set "MEDGUARD_API_KEY=%%i"
)
echo Cle API locale (conserver privee) : %MEDGUARD_API_KEY%
py -m uvicorn backend.api:app --host 127.0.0.1 --port 8000 --no-access-log
pause
