# 🚀 MERN Stack Expense Tracker - Setup Guide

## 📋 Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn

## 🔧 Setup Instructions

### 1. **MongoDB Setup**

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# After installation, start MongoDB service
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update MONGODB_URI in `backend/.env`

### 2. **Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already created, but update values if needed)
# Update MONGODB_URI with your MongoDB connection string
# Update JWT_SECRET if needed

# Start backend server
npm run dev

# Server will run on http://localhost:5000
```

### 3. **Frontend Setup**

```bash
# In root directory (separate terminal)

# Install dependencies
npm install

# Start React development server
npm start

# App will open on http://localhost:3000
```

## 🔑 Important Notes

### MongoDB Connection String Examples:

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/expense-tracker
```

**MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

### Backend .env file should look like:
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

## 🌟 Features

### Authentication
- ✅ Sign up with email and password
- ✅ Login with email and password
- ✅ JWT token-based authentication
- ✅ Secured API routes

### Wallet & Income
- ✅ Set monthly balance
- ✅ Add income with exact decimal values
- ✅ Income sources: Salary, Bonus, Business, Freelance, Investment, Gift
- ✅ Automatic balance calculation

### Expenses Management
- ✅ Add/Edit/Delete expenses
- ✅ Track by category
- ✅ Filter by date range
- ✅ Payment methods: Cash, Credit Card, Debit Card, UPI, Net Banking

### Analytics
- ✅ Category distribution charts
- ✅ Monthly trends
- ✅ Payment method analysis
- ✅ Daily spending tracker

### Data Management
- ✅ All data stored in MongoDB
- ✅ User-specific data isolation
- ✅ Export to CSV and JSON
- ✅ Budget management

## 📊 API Routes

### Authentication
```
POST   /api/auth/register    - Sign up
POST   /api/auth/login       - Login
GET    /api/auth/me          - Get current user (Protected)
```

### Expenses
```
GET    /api/expenses         - Get all expenses (Protected)
POST   /api/expenses         - Add expense (Protected)
PUT    /api/expenses/:id     - Update expense (Protected)
DELETE /api/expenses/:id     - Delete expense (Protected)
```

### Income
```
GET    /api/income           - Get all income (Protected)
POST   /api/income           - Add income (Protected)
PUT    /api/income/:id       - Update income (Protected)
DELETE /api/income/:id       - Delete income (Protected)
```

### Wallet
```
GET    /api/wallet           - Get current wallet (Protected)
POST   /api/wallet           - Set wallet (Protected)
GET    /api/wallet/all       - Get all wallets (Protected)
```

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check if backend is running on port 5000
- Check CORS settings in backend/server.js
- Update API_BASE_URL in src/services/api.js if needed

### MongoDB connection error
- Check MongoDB is running locally
- Check MongoDB Atlas credentials if using cloud
- Check connection string format

### Axios error with 401/403
- Clear localStorage and login again
- Check JWT_SECRET matches between login and validation
- Check token is being sent in Authorization header

## 📱 Usage

1. **First Time**
   - Sign up with email and password
   - Set your monthly wallet balance
   - Add income when you receive it

2. **Daily**
   - Add expenses as you spend
   - View remaining balance in summary
   - Check analytics for insights

3. **Monthly**
   - Review spending by category
   - Adjust budgets if needed
   - Analyze trends
   - Export data for records

## 🔒 Security Notes

- Change JWT_SECRET in production
- Use HTTPS in production
- Never commit .env file
- Use strong passwords
- Keep authentication tokens secure

## 📞 Support

For issues or questions:
1. Check MongoDB connection
2. Check backend logs
3. Check browser console for errors
4. Verify .env variables are set correctly

---

**Happy Expense Tracking! 💰📊**
