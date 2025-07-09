@echo off

echo Starting Java backend...
start "Java" cmd /k "cd /d %~dp0 && call java.bat"

echo Starting Python backend...
start "Python" cmd /k "cd /d %~dp0 && call py.bat"

echo Starting Node.js backend...
start "Node" cmd /k "cd /d %~dp0 && call node.bat"

echo Starting Frontend...
start "Frontend" cmd /k "cd /d %~dp0 && call frontend.bat"

echo All services launched in separate terminals.
