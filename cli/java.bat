@echo off

echo.
echo ==================================
echo    ==     =   =     =  = 
echo    ==    ===   =   =  === 
echo    ==   =   =   = =  =   = 
echo =====  =     =   =  =      = 
echo ==================================
echo.

cd java-backend || goto :error

echo Setting up Java backend server...
call mvnw spring-boot:run || goto :error

echo Java backend server is running.
goto :end

:error
echo Something went wrong. Exiting...
exit /b 1

:end
