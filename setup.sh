#!/bin/bash
# MERN Expense Tracker - Setup Script for Linux/Mac

echo ""
echo "============================================"
echo "  MERN Expense Tracker - Setup"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js detected:"
node -v
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed!"
    exit 1
fi

echo "✓ npm detected:"
npm -v
echo ""

# Install frontend dependencies
echo ""
echo "============================================"
echo "Installing Frontend Dependencies..."
echo "============================================"
echo ""
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
echo "✓ Frontend dependencies installed!"

# Install backend dependencies
echo ""
echo "============================================"
echo "Installing Backend Dependencies..."
echo "============================================"
echo ""
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    cd ..
    exit 1
fi
echo "✓ Backend dependencies installed!"
cd ..

echo ""
echo "============================================"
echo "✓ Setup Complete!"
echo "============================================"
echo ""
echo "Next Steps:"
echo ""
echo "1. Install MongoDB (local or cloud)"
echo "   - Local: Download from https://www.mongodb.com/try/download/community"
echo "   - Cloud: Create account at https://www.mongodb.com/cloud/atlas"
echo ""
echo "2. Update backend/.env with MongoDB URI"
echo "   MONGODB_URI=mongodb://localhost:27017/expense-tracker"
echo ""
echo "3. Start Backend (in separate terminal):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "4. Start Frontend (in separate terminal):"
echo "   npm start"
echo ""
echo "5. Access app at http://localhost:3000"
echo ""
echo "============================================"
echo ""
