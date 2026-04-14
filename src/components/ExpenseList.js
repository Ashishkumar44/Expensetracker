import React from 'react';
import { format } from 'date-fns';

function ExpenseList({ expenses, onDeleteExpense, onEditExpense, onClearAllExpenses }) {
  if (expenses.length === 0) {
    return (
      <div className="expense-list empty">
        <p>📭 No expenses found. Add your first expense to get started!</p>
      </div>
    );
  }

  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="expense-list">
      <div className="expense-list-header">
        <h2>📋 Expense List ({expenses.length} items)</h2>
        <button className="btn-danger" onClick={onClearAllExpenses}>
          🧹 Clear All Expenses
        </button>
      </div>
      <div className="expense-items">
        {sortedExpenses.map(expense => {
          const expenseId = expense._id || expense.id;
          return (
          <div key={expenseId} className="expense-item">
            <div className="expense-details">
              <div className="expense-header">
                <h3>{expense.description}</h3>
                <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
              </div>
              <div className="expense-meta">
                <span className="category-badge">{expense.category}</span>
                <span className="date">{format(new Date(expense.date), 'dd MMM yyyy')}</span>
                <span className="payment-method">{expense.paymentMethod}</span>
              </div>
            </div>
            <div className="expense-actions">
              <button 
                className="btn-edit" 
                onClick={() => onEditExpense(expense)}
                title="Edit"
              >
                ✏️
              </button>
              <button 
                className="btn-delete" 
                onClick={() => onDeleteExpense(expenseId)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}

export default ExpenseList;
