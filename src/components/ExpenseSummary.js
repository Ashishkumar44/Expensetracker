import React from 'react';

function ExpenseSummary({ expenses, budgets, wallet, income }) {
  const toPaise = (value) => Math.round((Number(value) || 0) * 100);
  const fromPaise = (value) => value / 100;

  const now = new Date();
  const [walletMonthIndex, walletYear] = (wallet?.month || `${now.getMonth()}-${now.getFullYear()}`)
    .split('-')
    .map(Number);

  const effectiveMonth = Number.isInteger(walletMonthIndex) ? walletMonthIndex : now.getMonth();
  const effectiveYear = Number.isInteger(walletYear) ? walletYear : now.getFullYear();

  const monthExpenses = expenses.filter((exp) => {
    const d = new Date(exp.date);
    return d.getMonth() === effectiveMonth && d.getFullYear() === effectiveYear;
  });

  const monthIncome = income.filter((inc) => {
    const d = new Date(inc.date);
    return d.getMonth() === effectiveMonth && d.getFullYear() === effectiveYear;
  });

  const totalExpensesPaise = monthExpenses.reduce((sum, exp) => sum + toPaise(exp.amount), 0);
  const totalIncomePaise = monthIncome.reduce((sum, inc) => sum + toPaise(inc.amount), 0);
  const walletAmountPaise = toPaise(wallet?.amount);

  const totalExpenses = fromPaise(totalExpensesPaise);
  const totalIncome = fromPaise(totalIncomePaise);
  const availableFunds = fromPaise(walletAmountPaise + totalIncomePaise);
  
  // Calculate current balance: Initial Balance + Total Income - Total Expenses
  const currentBalance = fromPaise(walletAmountPaise + totalIncomePaise - totalExpensesPaise);
  
  // Calculate category-wise totals for effective wallet month
  const categoryTotals = monthExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + toPaise(exp.amount);
    return acc;
  }, {});

  // Calculate total budget
  const totalBudgetPaise = Object.values(budgets).reduce((sum, budget) => sum + toPaise(budget), 0);
  const remainingBudgetPaise = totalBudgetPaise - totalExpensesPaise;
  const remainingBudget = fromPaise(remainingBudgetPaise);

  // This month's expenses (calendar current month)
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const thisMonthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
  });
  const thisMonthTotal = fromPaise(thisMonthExpenses.reduce((sum, exp) => sum + toPaise(exp.amount), 0));

  // Today's expenses
  const today = new Date().toISOString().split('T')[0];
  const todayExpenses = expenses.filter(exp => exp.date === today);
  const todayTotal = fromPaise(todayExpenses.reduce((sum, exp) => sum + toPaise(exp.amount), 0));

  return (
    <div className="expense-summary">
      <h2>💹 Summary</h2>

      <div className="math-breakdown">
        <strong>Formula:</strong> Opening Balance + Extra Added - Expenses = Remaining
        <span>
          ₹{fromPaise(walletAmountPaise).toFixed(2)} + ₹{totalIncome.toFixed(2)} - ₹{totalExpenses.toFixed(2)} = ₹{currentBalance.toFixed(2)}
        </span>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card balance">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3>Remaining Balance</h3>
            <p className="amount">₹{currentBalance.toFixed(2)}</p>
            <small>{currentBalance < 0 ? '⚠️ Over-spent' : '✅ Left after expenses'}</small>
          </div>
        </div>

        <div className="summary-card income">
          <div className="card-icon">📈</div>
          <div className="card-content">
            <h3>Extra Added</h3>
            <p className="amount">₹{totalIncome.toFixed(2)}</p>
            <small>
              {walletAmountPaise > 0
                ? `Opening (${new Date(effectiveYear, effectiveMonth, 1).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}): ₹${fromPaise(walletAmountPaise).toFixed(2)}`
                : 'Set your wallet balance'}
            </small>
          </div>
        </div>

        <div className="summary-card month">
          <div className="card-icon">🏦</div>
          <div className="card-content">
            <h3>Total Available</h3>
            <p className="amount">₹{availableFunds.toFixed(2)}</p>
            <small>Opening + Extra Added</small>
          </div>
        </div>

        <div className="summary-card total">
          <div className="card-icon">💸</div>
          <div className="card-content">
            <h3>Total Spent</h3>
            <p className="amount">₹{totalExpenses.toFixed(2)}</p>
            <small>{new Date(effectiveYear, effectiveMonth, 1).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</small>
          </div>
        </div>

        <div className="summary-card month">
          <div className="card-icon">📅</div>
          <div className="card-content">
            <h3>This Month Spent</h3>
            <p className="amount">₹{thisMonthTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="summary-card today">
          <div className="card-icon">📆</div>
          <div className="card-content">
            <h3>Today</h3>
            <p className="amount">₹{todayTotal.toFixed(2)}</p>
          </div>
        </div>

        {totalBudgetPaise > 0 && (
          <div className={`summary-card budget ${remainingBudget < 0 ? 'over-budget' : ''}`}>
            <div className="card-icon">💵</div>
            <div className="card-content">
              <h3>Budget Status</h3>
              <p className="amount">
                {remainingBudget >= 0 ? '✅' : '⚠️'} ₹{Math.abs(remainingBudget).toFixed(2)}
              </p>
              <small>{remainingBudget >= 0 ? 'Remaining' : 'Over Budget'}</small>
            </div>
          </div>
        )}
      </div>

      {Object.keys(categoryTotals).length > 0 && (
        <div className="category-breakdown">
          <h3>Category Breakdown</h3>
          <div className="category-list">
            {Object.entries(categoryTotals)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amountPaise]) => {
                const amount = fromPaise(amountPaise);
                const percentage = totalExpensesPaise > 0 ? ((amountPaise / totalExpensesPaise) * 100).toFixed(1) : '0.0';
                const budget = budgets[category];
                const budgetPaise = toPaise(budget);
                const isOverBudget = budgetPaise > 0 && amountPaise > budgetPaise;

                return (
                  <div key={category} className="category-item">
                    <div className="category-info">
                      <span className="category-name">{category}</span>
                      {budget && (
                        <span className={`budget-indicator ${isOverBudget ? 'over' : 'under'}`}>
                          {isOverBudget ? '⚠️' : '✓'} Budget: ₹{fromPaise(budgetPaise).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="category-bar">
                      <div 
                        className={`category-progress ${isOverBudget ? 'over-budget' : ''}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="category-amount">₹{amount.toFixed(2)} ({percentage}%)</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseSummary;
