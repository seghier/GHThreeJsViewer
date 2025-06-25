@echo off
title 3D Viewer Server (Sharable)

:: --- Configuration ---
set VENV_DIR=venv
set PORT=8000

:: --- Check for Virtual Environment ---
if not exist "%VENV_DIR%\Scripts\activate.bat" (
    echo.
    echo ====================================================================
    echo  ERROR: Virtual environment not found. 
    echo  Please run a setup script or create it manually first:
    echo  python -m venv venv
    echo  %VENV_DIR%\Scripts\activate
    echo  pip install Flask Flask-CORS
    echo ====================================================================
    echo.
    pause
    exit /b
)

:: Activate the virtual environment
echo Activating virtual environment...
call "%VENV_DIR%\Scripts\activate.bat"

:: --- Find the Local IP Address ---
set "my_ip=Not Found"
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| find "IPv4"') do (
    for /f "tokens=*" %%b in ("%%a") do set my_ip=%%b
)

:: Start the Flask server
echo Starting Flask server on port %PORT%...
echo (You will see server output in this window)
echo.

:: Run Python server directly. This window will show its output and stay open.
python server.py

:: The script will only reach here if the python server.py script exits or is terminated.
echo.
echo ====================================================================
echo  SERVER STOPPED.
echo ====================================================================
echo.
pause