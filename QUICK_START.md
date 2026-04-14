# ⚡ Quick Start Guide - MERN Expense Tracker

---

## 🚀 QUICK START (5 Minutes)

### Prerequisites Checklist
- [ ] Node.js installed (v14+)
- [ ] npm installed (v6+)
- [ ] MongoDB installed or Atlas account created

---

## 📋 Step 1: Setup MongoDB

### Option A: Local MongoDB (Windows)
```bash
# Download from: https://www.mongodb.com/try/download/community
# Install and start MongoDB Service
```

### Option B: MongoDB Atlas (Cloud)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Copy string and use in backend/.env

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
```

---

## 💻 Step 2: Clone/Download Project

```bash
# Navigate to your project folder
cd EXpenseTracker
```

---

## ⚙️ Step 3: Install Dependencies

### Windows (Easy)
```bash
# Double-click setup.bat
# OR run in PowerShell/CMD
setup.bat
```

### Mac/Linux
```bash
chmod +x setup.sh
./setup.sh
```

### Manual
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

---

## 🔧 Step 4: Configure Backend

Edit `backend/.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/expense-tracker

# OR if using MongoDB Atlas:
# MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/expense-tracker

# JWT Secret (change in production)
JWT_SECRET=your_secret_key_here

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

---

## 🎬 Step 5: Start Application

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

### Terminal 2: Start Frontend
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!
Local: http://localhost:3000
```

---

## 🌐 Step 6: Open in Browser

Visit: **http://localhost:3000**

---

## 👤 Step 7: Create Account

### Sign Up
1. Click "Sign Up"
2. Enter Name, Email, Password
3. Confirm Password
4. Click "Sign Up"

### Login
1. Enter Email
2. Enter Password
3. Click "Login"

---

## 💰 Step 8: Start Using App

### 1️⃣ Set Monthly Wallet
```
Tab: "Wallet"
→ Enter Starting Balance (e.g., 50000)
→ Click "Set Balance"
```

### 2️⃣ Add Income
```
Tab: "Wallet"
→ Enter Amount (e.g., 5000.50)
→ Enter Description (e.g., "Salary")
→ Select Source
→ Click "Add Income"
```

### 3️⃣ Add Expenses
```
Tab: "Expenses"
→ Enter Amount
→ Enter Description
→ Select Category
→ Select Date
→ Click "Add Expense"
```

### 4️⃣ View Summary
```
"Summary" section shows:
- Remaining Balance
- Total Income
- Total Expenses
```

### 5️⃣ View Analytics
```
Tab: "Analytics"
→ Select Time Range
→ View Charts & Insights
```

---

## 🔑 Default Login Test

After setup, you can test with:
```
Email: test@example.com
Password: test@123
```

(Create this account during signup first)

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected
- [ ] Can sign up new account
- [ ] Can login
- [ ] Can add wallet
- [ ] Can add income
- [ ] Can add expense
- [ ] Balance updates automatically

---

## 🎯 Key Features to Try

1. **Wallet Tab**
   - Set balance
   - Add income
   - View history

2. **Expenses Tab**
   - Add expense
   - Edit/Delete
   - Filter by date/category
   - Export CSV/JSON

3. **Analytics Tab**
   - View charts
   - See trends
   - Filter by time range

4. **Budget Tab**
   - Set category budgets
   - Track usage
   - Get alerts

5. **Categories Tab**
   - View all categories
   - Add custom category
   - See statistics

---

## 🐛 Common Issues & Solutions

### ❌ "Can't connect to backend"
```
✅ Solution:
1. Check backend is running (Terminal 1)
2. Check port 5000 is available
3. Refresh browser
```

### ❌ "MongoDB connection error"
```
✅ Solution:
1. Check MongoDB is running
2. Verify connection string in backend/.env
3. Check internet (if using Atlas)
```

### ❌ "Port 5000 already in use"
```
✅ Solution: Windows CMD
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ "Can't login after signup"
```
✅ Solution:
1. Clear browser cache (Ctrl+Shift+Del)
2. Clear localStorage (F12 → Application → Clear)
3. Try again
```

### ❌ "Income showing as rounded number"
```
✅ This is FIXED!
All amounts stored with decimals in MongoDB
Example: 5000.75 stays as 5000.75
```

---

## 📊 Database Check

Verify MongoDB is storing data:

### Using MongoDB Compass
1. Download MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Check `expense-tracker` database
4. View collections: `users`, `expenses`, `income`, etc.

### Using MongoDB Shell
```bash
mongosh
use expense-tracker
db.users.find()
db.expenses.find()
db.income.find()
```

---

## 🎓 Learning Resources

- [MERN_README.md](./MERN_README.md) - Full documentation
- [MERN_SETUP_GUIDE.md](./MERN_SETUP_GUIDE.md) - Detailed setup
- [MongoDB Docs](https://docs.mongodb.com/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)

---

## 📱 Usage Tips

1. **Add expenses daily** - For accurate tracking
2. **Add income immediately** - When received
3. **Check balance** - Before spending
4. **Review monthly** - Analyze trends
5. **Set budgets** - Limit overspending

---

## 🔐 Security Notes

⚠️ **Important:**
- Change JWT_SECRET in production
- Use strong passwords (8+ chars)
- Don't share your login token
- Keep .env file secure

---

## 🎉 You're All Set!

```
✅ Backend: http://localhost:5000
✅ Frontend: http://localhost:3000
✅ Database: MongoDB Connected
✅ Auth: JWT Enabled
✅ Ready to Track Expenses!
```

---

## 📞 Need Help?

1. **Check logs** - Look for error messages
2. **Verify setup** - Re-read this guide
3. **Check ports** - Ensure no conflicts
4. **Restart services** - Fresh start sometimes helps

---

## 🌟 Next Steps

1. Set your monthly wallet balance
2. Add some income
3. Add your expenses
4. Check the summary
5. View analytics
6. Explore all features
7. Invite friends!

---

## 💾 Backup Your Data

Export your data regularly:
```
Expenses Tab → "Export CSV" or "Export JSON"
Keep backups on your computer
```

---

**Happy Tracking! 💰📊**

Questions? Check the detailed documentation in MERN_README.md and MERN_SETUP_GUIDE.md

---

## 🎯 What's Next?

- Monitor your expenses
- Set realistic budgets
- Track spending patterns
- Achieve financial goals
- Build savings habits

**Start today, improve tomorrow! 💪💰**
