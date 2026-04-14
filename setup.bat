@echo off
REM MERN Expense Tracker - Setup Script for Windows

echo.
echo ============================================
echo   MERN Expense Tracker - Setup
echo ============================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detected: 
node -v
echo.

REM Check if npm is installed
npm -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)

echo ✓ npm detected:
npm -v
echo.

REM Install frontend dependencies
echo.
echo ============================================
echo Installing Frontend Dependencies...
echo ============================================
echo.
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed!

REM Install backend dependencies
echo.
echo ============================================
echo Installing Backend Dependencies...
echo ============================================
echo.
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    cd..
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed!
cd..

echo.
echo ============================================
echo ✓ Setup Complete!
echo ============================================
echo.
echo Next Steps:
echo.
echo 1. Install MongoDB (local or cloud)
echo    - Local: Download from https://www.mongodb.com/try/download/community
echo    - Cloud: Create account at https://www.mongodb.com/cloud/atlas
echo.
echo 2. Update backend\.env with MongoDB URI
echo    MONGODB_URI=mongodb://localhost:27017/expense-tracker
echo.
echo 3. Start Backend (in separate terminal):
echo    cd backend
echo    npm run dev
echo.
echo 4. Start Frontend (in separate terminal):
echo    npm start
echo.
echo 5. Access app at http://localhost:3000
echo.
echo ============================================
echo.
pause
