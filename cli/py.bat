@echo off

cd py-backend || goto :error

echo Activating Python virtual environment...
call .venv\Scripts\activate.bat || goto :error

echo Starting Python backend...
python -m uvicorn src.main:app --reload
goto end

:error
echo [ERROR] Something went wrong. Exiting...
exit /b 1

:end
