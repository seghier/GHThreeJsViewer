@echo off
setlocal enabledelayedexpansion

REM --- Configuration ---
set VENV_NAME=venv
set PYTHON_EXE=py
REM If 'py' doesn't work, try 'python'
REM set PYTHON_EXE=python
set REQUIREMENTS=Flask Flask-CORS

REM --- Check for Python ---
echo Checking for Python...
%PYTHON_EXE% --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python executable '%PYTHON_EXE%' not found.
    echo Please install Python 3 and ensure it's added to your system PATH.
    echo If you installed Python from the Microsoft Store, you might need to use 'python' instead of 'py'.
    echo You can try changing PYTHON_EXE at the top of this script.
    pause
    exit /b 1
)
echo Found Python: %PYTHON_EXE%

REM --- Create Virtual Environment if it doesn't exist ---
if not exist "%VENV_NAME%\Scripts\activate.bat" (
    echo Creating virtual environment '%VENV_NAME%'...
    %PYTHON_EXE% -m venv "%VENV_NAME%"
    if %errorlevel% neq 0 (
        echo ERROR: Failed to create virtual environment.
        pause
        exit /b 1
    )
    echo Virtual environment created successfully.
) else (
    echo Virtual environment '%VENV_NAME%' already exists.
    echo If you need to reinstall packages, delete the '%VENV_NAME%' folder and run this script again.
)

REM --- Activate Virtual Environment ---
echo Activating virtual environment for package installation...
call "%VENV_NAME%\Scripts\activate.bat"
if %errorlevel% neq 0 (
    echo ERROR: Failed to activate virtual environment.
    echo This might happen if the venv creation failed or was interrupted.
    pause
    exit /b 1
)

REM --- Upgrade pip first ---
echo Upgrading pip...
python -m pip install --upgrade pip
if %errorlevel% neq 0 (
    echo WARNING: Failed to upgrade pip, continuing with installation...
)

REM --- Install/Upgrade Dependencies ---
echo Installing/Updating dependencies: %REQUIREMENTS%
pip install --upgrade %REQUIREMENTS%
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python packages using pip.
    echo Make sure you have an internet connection and pip is working properly.
    pause
    exit /b 1
)
echo Dependencies installation complete.

REM --- Deactivate Virtual Environment ---
echo Deactivating virtual environment...
deactivate

echo.
echo ====================================
echo Setup complete!
echo ====================================
echo Virtual environment '%VENV_NAME%' is ready to use.
echo To activate it manually, run: %VENV_NAME%\Scripts\activate.bat
echo You can now run your server using your start_server.bat (or similar).
echo.
pause