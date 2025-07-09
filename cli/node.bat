@echo off
cd backend || goto :error
call npm run dev || goto :error