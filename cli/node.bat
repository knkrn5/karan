@echo off
echo =================================================
echo =    ==  =====  ===    =====         =  ===== 
echo =   = =  =   =  =  =   =             =  =     
echo =  =  =  =   =  =   =  ====          =  ===== 
echo = =   =  =   =  =  =   =     ===     =      = 
echo ==    =  =====  ===    ===== === =====  ===== 
echo =================================================
echo.

setlocal

set "BUILD_MODE=false"
if "%1"=="--build" set "BUILD_MODE=true"

cd backend || goto :error

if "%BUILD_MODE%"=="true" (
    call npm run build  || goto :error
) else (
    call npm run dev || goto :error
)

exit /b 0

:error
echo Something went wrong. Exiting...
exit /b 1