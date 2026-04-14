# 💰 MERN Stack Advanced Expense Tracker

A full-featured expense tracking application built with **MongoDB, Express, React, and Node.js** (MERN Stack). Track your income, expenses, budgets, and finances with secure authentication!

## 🌟 Key Features

### 🔐 **Authentication & Security**
- User registration and login with JWT
- Password hashing with bcryptjs
- Protected API routes
- Secure token-based sessions
- User-specific data isolation

### 💰 **Wallet & Income Management**
- Set monthly starting balance
- Add income with exact decimal values (no rounding)
- Income sources: Salary, Bonus, Business, Freelance, Investment, Gift
- Automatic balance calculation: Starting + Income - Expenses
- Income history tracking

### 📝 **Expense Management**
- Add, edit, delete expenses
- Categorize expenses (10 default categories + custom)
- Payment methods: Cash, Credit Card, Debit Card, UPI, Net Banking
- Date-based tracking
- Search and filter capabilities

### 🏷️ **Category Management**
- 10 pre-defined categories
- Create custom categories
- View category statistics
- Delete unused categories

### 💵 **Budget Management**
- Set budget limits for each category
- Real-time budget tracking
- Visual progress indicators
- Over-budget alerts
- Budget statistics

### 📊 **Analytics & Reports**
- Pie charts - Category distribution
- Bar charts - Payment method analysis
- Line charts - Monthly trends
- Daily spending tracker
- Time range filters (month/3 months/6 months/year/all)
- Detailed statistics and insights

### 📤 **Data Export**
- Export to CSV format
- Export to JSON format
- Filter-based export
- Backup functionality

### 🎨 **User Interface**
- Beautiful gradient design
- Responsive layout (desktop, tablet, mobile)
- Dark/Light theme ready
- Hindi + English support
- Intuitive navigation

## 🏗️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **date-fns** - Date utilities
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## 📋 Prerequisites

- **Node.js** v14 or higher
- **npm** v6 or higher
- **MongoDB** (Local or Atlas Cloud)

## 🚀 Quick Start

### Option 1: Automatic Setup (Windows)
```bash
# Run setup batch file
setup.bat
```

### Option 2: Automatic Setup (Linux/Mac)
```bash
# Make script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Option 3: Manual Setup

#### Step 1: Install Frontend Dependencies
```bash
npm install
```

#### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### Step 3: Configure MongoDB
Update `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

#### Step 4: Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

#### Step 5: Start Frontend (Terminal 2)
```bash
npm start
```

#### Step 6: Access Application
Open browser: **http://localhost:3000**

## 📁 Project Structure

```
EXpenseTracker/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── expenseController.js # Expense logic
│   │   ├── incomeController.js  # Income logic
│   │   └── walletController.js  # Wallet logic
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Expense.js           # Expense schema
│   │   ├── Income.js            # Income schema
│   │   ├── Wallet.js            # Wallet schema
│   │   ├── Budget.js            # Budget schema
│   │   └── Category.js          # Category schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── expenses.js          # Expense routes
│   │   ├── income.js            # Income routes
│   │   └── wallet.js            # Wallet routes
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Express app entry
│
├── src/
│   ├── components/
│   │   ├── Login.js             # Auth component
│   │   ├── ExpenseForm.js       # Add/Edit expense
│   │   ├── ExpenseList.js       # Expense list
│   │   ├── ExpenseFilter.js     # Filter expenses
│   │   ├── ExpenseSummary.js    # Summary dashboard
│   │   ├── WalletManager.js     # Wallet management
│   │   ├── BudgetManager.js     # Budget management
│   │   ├── CategoryManager.js   # Category management
│   │   └── Analytics.js         # Charts & analytics
│   ├── services/
│   │   └── api.js               # API calls
│   ├── styles/
│   │   └── Auth.css             # Login styling
│   ├── utils/
│   │   └── exportUtils.js       # Export functions
│   ├── App.js                   # Main component
│   ├── App.css                  # Main styling
│   ├── index.js                 # React entry
│   └── index.css                # Global styles
│
├── public/
│   └── index.html               # HTML template
│
├── package.json                 # Frontend dependencies
├── MERN_SETUP_GUIDE.md         # Detailed setup guide
├── setup.bat                    # Windows setup script
└── setup.sh                     # Linux/Mac setup script
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    Register new user
POST   /api/auth/login       Login user
GET    /api/auth/me          Get current user (Protected)
```

**Request/Response Examples:**
```javascript
// Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

// Response
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Expenses
```
GET    /api/expenses              Get all expenses (Protected)
POST   /api/expenses              Add expense (Protected)
PUT    /api/expenses/:id          Update expense (Protected)
DELETE /api/expenses/:id          Delete expense (Protected)
```

**Example:**
```javascript
// Add Expense
POST /api/expenses
Header: Authorization: Bearer <token>

{
  "amount": 500.50,
  "description": "Lunch",
  "category": "Food & Dining",
  "date": "2024-01-15",
  "paymentMethod": "Cash"
}
```

### Income
```
GET    /api/income                Get all income (Protected)
POST   /api/income                Add income (Protected)
PUT    /api/income/:id            Update income (Protected)
DELETE /api/income/:id            Delete income (Protected)
```

**Example:**
```javascript
// Add Income
POST /api/income
Header: Authorization: Bearer <token>

{
  "amount": 50000.75,
  "description": "Monthly Salary",
  "source": "Salary",
  "date": "2024-01-01"
}
```

### Wallet
```
GET    /api/wallet                Get current wallet (Protected)
POST   /api/wallet                Set wallet (Protected)
GET    /api/wallet/all            Get all wallets (Protected)
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for secure password storage
- **Protected Routes** - API endpoints require authentication
- **CORS Enabled** - Cross-origin requests handled
- **User Isolation** - Each user can only access their data
- **Environment Variables** - Sensitive data in .env

## 📱 Usage Guide

### First-Time Setup
1. **Sign Up** - Create account with email/password
2. **Set Wallet** - Enter monthly starting balance
3. **Add Income** - Record income sources
4. **Add Expenses** - Track daily spending
5. **View Analytics** - Get insights from charts

### Daily Workflow
```
1. Open app → Login
2. Add expense → Balance updates automatically
3. Add income → Balance increases automatically
4. Check remaining in Summary
5. View Analytics for patterns
```

### Monthly Workflow
```
1. Review spending by category
2. Adjust budgets if needed
3. Check analytics trends
4. Export data for records
5. Set next month's wallet
```

## 🎯 Key Calculations

### Remaining Balance
```
Remaining = Initial Wallet + Total Income - Total Expenses
```

### Category Usage
```
Usage % = (Category Expenses / Total Expenses) × 100
```

### Budget Status
```
Remaining = Budget - Expenses
```

## 🐛 Troubleshooting

### Can't connect to MongoDB
**Solution:** 
- Check MongoDB is running locally: `mongod`
- Or verify MongoDB Atlas connection string in `.env`

### Frontend can't connect to backend
**Solution:**
- Verify backend running on port 5000
- Check CORS in backend/server.js
- Clear browser cache/localStorage

### Axios 401 error
**Solution:**
- Clear localStorage and login again
- Verify JWT_SECRET matches
- Check token in Authorization header

### Port already in use
**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows
```

## 📊 Data Models

### User Schema
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed),
  phone: String,
  currency: String (default: 'INR'),
  createdAt: Date
}
```

### Expense Schema
```javascript
{
  userId: ObjectId (required),
  amount: Number (decimal),
  description: String,
  category: String,
  date: Date,
  paymentMethod: String,
  notes: String
}
```

### Income Schema
```javascript
{
  userId: ObjectId (required),
  amount: Number (decimal),
  description: String,
  source: String (Salary, Bonus, etc),
  date: Date
}
```

### Wallet Schema
```javascript
{
  userId: ObjectId (required),
  amount: Number (decimal),
  month: String,
  setDate: Date,
  description: String
}
```

## 🌍 Environment Variables

### Frontend
```javascript
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

## 📈 Performance Tips

1. **Use MongoDB Indexes** - Add indexes for frequently queried fields
2. **Pagination** - Implement pagination for large datasets
3. **Caching** - Use browser cache for static assets
4. **Lazy Loading** - Load heavy charts on demand
5. **Database Optimization** - Archive old expenses

## 🔄 Future Enhancements

- [ ] Multi-currency support
- [ ] Recurring expenses
- [ ] Bill reminders
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Advanced filtering
- [ ] Expense splitting
- [ ] Integration with banks
- [ ] Subscription tracking
- [ ] Budget notifications

## 📝 License

This project is open source and available for personal use.

## 👨‍💻 Author

Created with ❤️ for better financial management

---

## 💬 Support

For issues:
1. Check MongoDB connection
2. Review error messages in console
3. Check .env variables
4. Clear localStorage and login again

## 🎉 Getting Help

- Check MERN_SETUP_GUIDE.md
- Review backend logs
- Check browser console (F12)
- Verify all ports are available

---

**Happy Expense Tracking! 💰📊**

Start managing your finances with confidence today!
