import React, { useState } from 'react';

function BudgetManager({ budgets, categories, expenses, onUpdateBudget, onDeleteBudget }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!budgetAmount || parseFloat(budgetAmount) <= 0) {
      alert('Please enter a valid budget amount');
      return;
    }
    onUpdateBudget(selectedCategory, budgetAmount);
    setBudgetAmount('');
  };

  // Calculate spending for each category
  const categorySpending = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div className="budget-manager">
      <h2>💵 Budget Management</h2>
      
      <div className="budget-form">
        <h3>Set Category Budget</h3>
        <form onSubmit={handleAddBudget}>
          <div className="form-row">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="number"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              placeholder="Budget amount"
              step="0.01"
            />
            <button type="submit" className="btn-primary">
              {budgets[selectedCategory] ? '📝 Update' : '➕ Add'}
            </button>
          </div>
        </form>
      </div>

      <div className="budget-list">
        <h3>Current Budgets</h3>
        {Object.keys(budgets).length === 0 ? (
          <p className="empty-state">No budgets set. Add a budget to start tracking!</p>
        ) : (
          <div className="budget-items">
            {Object.entries(budgets).map(([category, budget]) => {
              const spent = categorySpending[category] || 0;
              const percentage = (spent / budget) * 100;
              const remaining = budget - spent;
              const isOverBudget = remaining < 0;

              return (
                <div key={category} className={`budget-item ${isOverBudget ? 'over-budget' : ''}`}>
                  <div className="budget-header">
                    <h4>{category}</h4>
                    <button 
                      className="btn-delete-small"
                      onClick={() => onDeleteBudget(category)}
                      title="Remove budget"
                    >
                      ❌
                    </button>
                  </div>
                  
                  <div className="budget-details">
                    <div className="budget-stats">
                      <div className="stat">
                        <span className="label">Budget:</span>
                        <span className="value">₹{budget.toFixed(2)}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Spent:</span>
                        <span className="value">₹{spent.toFixed(2)}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Remaining:</span>
                        <span className={`value ${isOverBudget ? 'negative' : 'positive'}`}>
                          ₹{remaining.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="budget-progress">
                      <div 
                        className={`progress-bar ${isOverBudget ? 'over' : ''}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="budget-percentage">
                      {percentage.toFixed(1)}% {isOverBudget ? 'over budget' : 'used'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="budget-tips">
        <h3>💡 Budget Tips</h3>
        <ul>
          <li>Set realistic budgets based on your income and expenses</li>
          <li>Review and adjust budgets monthly</li>
          <li>Track daily to avoid overspending</li>
          <li>Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
        </ul>
      </div>
    </div>
  );
}

export default BudgetManager;
