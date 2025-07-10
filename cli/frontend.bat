@echo off
echo.
echo ==================================
echo    =      =   =       =   = 
echo    =     = =   =     =   = = 
echo    =    =====   =   =   ===== 
echo    =   =     =   = =   =      =
echo ====  =       =   =   =        = 
echo ==================================
echo.
cd frontend || goto :error
call npm run dev || goto :error
:error
echo "Error occurred while starting the frontend."
exit /b 1