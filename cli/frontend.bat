@echo off
echo.
echo =============================================================
echo =====  =====  =====  ==    =  ===== =====  ==    =  ===   
echo ===    =   =  =   =  = =   =    =   =      = =   =  =  =   
echo =      =====  =   =  =  =  =    =   ===    =  =  =  =   =  
echo =      =      =   =  =   = =    =   =      =   = =  =  =   
echo =      =   =  =====  =    ==    =   =====  =    ==  ===    
echo ==============================================================
echo.
cd frontend || goto :cdError
call npm run dev || goto :runError
exit /b 0

:cdError
echo Error while navigating to frontend folder.
exit /b 1

:runError
echo Error occurred while starting the frontend.
exit /b 1