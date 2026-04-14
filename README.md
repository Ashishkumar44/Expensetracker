# 💰 Advanced Expense Tracker

A comprehensive React.js based expense tracking application with advanced features for managing your personal finances efficiently. Track your income, expenses, and remaining balance in real-time!

## ✨ Features

### 💰 Wallet Management (NEW!)
- **Set Monthly Balance** - महीने की शुरुआत में अपना कुल पैसा सेट करें
- **Add Income** - जब भी पैसा मिले तो आय में जोड़ें (Salary, Bonus, Business, etc.)
- **Track Remaining Balance** - देखें कितना पैसा बचा है
- **Income History** - सभी आय का पूरा इतिहास देखें
- **Automatic Calculation** - Starting Balance + Income - Expenses = Remaining Balance
- **Hindi + English Support** - दोनों भाषाओं में उपलब्ध

### 📝 Expense Management
- **Add/Edit/Delete Expenses** - Easily manage your expenses with a user-friendly interface
- **Detailed Expense Information** - Track amount, description, category, date, and payment method
- **Real-time Updates** - All changes are reflected instantly

### 🔍 Advanced Filtering
- **Search Functionality** - Search expenses by description or category
- **Category Filter** - Filter expenses by specific categories
- **Date Range Filter** - View expenses within a specific time period
- **Multi-criteria Filtering** - Combine multiple filters for precise results

### 📊 Analytics & Insights
- **Interactive Charts** - Visualize your spending with pie charts, bar charts, and line graphs
- **Category Distribution** - See how much you spend in each category
- **Payment Method Analysis** - Track spending across different payment methods
- **Monthly Trends** - Analyze your spending patterns over time
- **Daily Spending Tracker** - Monitor daily expenses for the current month
- **Time Range Selection** - View analytics for different time periods (1 month, 3 months, 6 months, 1 year, all time)

### 💵 Budget Management
- **Set Category Budgets** - Define spending limits for each category
- **Budget Tracking** - Real-time tracking of budget usage
- **Visual Progress Indicators** - See how much of your budget is remaining
- **Over-budget Alerts** - Get notified when you exceed your budget
- **Budget Statistics** - Detailed breakdown of budget vs. actual spending

### 🏷️ Category Management
- **Custom Categories** - Create your own expense categories
- **Pre-defined Categories** - Start with 10 default categories
- **Category Statistics** - See transaction count and total spending per category
- **Delete Unused Categories** - Keep your category list clean and organized

### 💹 Summary Dashboard
- **Remaining Balance** - बचा हुआ पैसा (Starting + Income - Expenses)
- **Total Income** - कुल आय with starting balance info
- **Total Expenses** - कुल खर्चे overview
- **This Month Summary** - Current month's spending
- **Today's Expenses** - Daily expense tracking
- **Budget Status** - Quick view of budget health
- **Category Breakdown** - Visual representation of spending by category

### 📤 Export Functionality
- **Export to CSV** - Download expenses in CSV format
- **Export to JSON** - Export data in JSON format
- **Filtered Exports** - Export only filtered data

### 💾 Data Persistence
- **Local Storage** - All data is stored locally in your browser
- **Auto-save** - Changes are automatically saved
- **Privacy-focused** - No data is sent to external servers

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd EXpenseTracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📱 Usage

### Setting Up Your Wallet (महीने का बैलेंस सेट करना)
1. Go to the **वॉलेट (Wallet)** tab
2. Enter your starting balance for the month (महीने की शुरुआत में कितना पैसा है)
3. Click "बैलेंस सेट करें (Set Balance)"
4. Your initial balance is now set!

### Adding Income (आय जोड़ना)
1. Go to the **वॉलेट (Wallet)** tab
2. In the "आय जोड़ें (Add Income)" section:
   - Enter the amount (राशि)
   - Add description (विवरण) - e.g., "Salary", "Bonus"
   - Select source (स्रोत) - Salary, Business, Freelance, etc.
3. Click "आय जोड़ें (Add Income)"
4. The amount will be added to your balance automatically!

### Adding an Expense
1. Go to the **Expenses** tab
2. Fill in the expense details (amount, description, category, date, payment method)
3. Click "Add Expense"

### Editing an Expense
1. Find the expense in the expense list
2. Click the edit (✏️) button
3. Modify the details
4. Click "Update Expense"

### Setting a Budget
1. Go to the **Budget** tab
2. Select a category
3. Enter the budget amount
4. Click "Add" or "Update"

### Viewing Analytics
1. Go to the **Analytics** tab
2. Select your preferred time range
3. View charts and insights

### Managing Categories
1. Go to the **Categories** tab
2. Enter a new category name
3. Click "Add Category"
4. View statistics for each category

### Filtering Expenses
1. Use the search box to find specific expenses
2. Select a category from the dropdown
3. Set date ranges to filter by period
4. Click "Clear Filters" to reset

### Exporting Data
1. Apply any filters you want
2. Click "Export CSV" or "Export JSON"
3. The file will be downloaded to your device

## 🛠️ Built With

- **React** - Frontend framework
- **Recharts** - Charting library
- **date-fns** - Date manipulation library
- **CSS3** - Styling
- **Local Storage API** - Data persistence

## 📂 Project Structure

```
EXpenseTracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Analytics.js
│   │   ├── BudgetManager.js
│   │   ├── CategoryManager.js
│   │   ├── ExpenseFilter.js
│   │   ├── ExpenseForm.js
│   │   ├── ExpenseList.js
│   │   ├── ExpenseSummary.js
│   │   └── WalletManager.js
│   ├── utils/
│   │   └── exportUtils.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎨 Features Details

### Default Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Groceries
- Others

### Payment Methods
- Cash
- Credit Card
- Debit Card
- UPI
- Net Banking
- Other

### Income Sources
- Salary (वेतन)
- Bonus (बोनस)
- Business (व्यवसाय)
- Freelance (फ्रीलांस)
- Investment (निवेश)
- Gift (उपहार)
- Other (अन्य)

## 🔒 Privacy & Security

- All data is stored locally in your browser using Local Storage
- No data is transmitted to external servers
- No user account or login required
- Clear all data option available for privacy

## 📊 Analytics Metrics

- Total expenses across all categories
- Average expense per transaction
- Highest and lowest expense amounts
- Category-wise spending distribution
- Payment method usage patterns
- Monthly spending trends
- Daily spending for current month

## 💡 Tips for Best Use

1. **Set Monthly Balance** - हर महीने की शुरुआत में अपना बैलेंस सेट करें
2. **Add Income Immediately** - जब भी पैसा मिले तुरंत आय में जोड़ें
3. **Regular Expense Updates** - खर्चे daily add करें for accurate tracking
4. **Check Remaining Balance** - Summary में बचा हुआ पैसा regularly check करें
5. **Use Categories** - Properly categorize expenses for better insights
6. **Set Realistic Budgets** - Base budgets on your income and needs
7. **Review Analytics** - Check monthly trends to identify spending patterns
8. **Export Regularly** - Backup your data by exporting periodically

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available for personal use.

## 👨‍💻 Author

Created with ❤️ for better financial management

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Recharts for beautiful charts
- date-fns for date utilities

---

**Happy Expense Tracking! 💰📊**
