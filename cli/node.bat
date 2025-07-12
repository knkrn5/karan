@echo off
echo =================================================
echo =    ==  =====  ===    =====         =  ===== 
echo =   = =  =   =  =  =   =             =  =     
echo =  =  =  =   =  =   =  ====          =  ===== 
echo = =   =  =   =  =  =   =     ===     =      = 
echo ==    =  =====  ===    ===== === =====  ===== 
echo =================================================
echo.
cd backend || goto :error
call npm run dev || goto :error

:error
echo Something went wrong. Exiting...
exit /b 1