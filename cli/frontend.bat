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

setlocal

:: Check for --build argument at first place after the .bat command
set "BUILD_MODE=false"
if "%1"=="--build" set "BUILD_MODE=true"

:: Navigate to frontend folder
cd frontend || goto :cdError

:: Run appropriate npm command
if "%BUILD_MODE%"=="true" (
    call npm run build || goto :buildError
) else (
    call npm run dev || goto :runError
)

exit /b 0

:cdError
echo Error while navigating to frontend folder.
exit /b 1

:buildError
echo Error occurred while building the frontend
exit /b 1

:runError
echo Error occurred while starting the frontend.
exit /b 1