import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetManager from './components/BudgetManager';
import CategoryManager from './components/CategoryManager';
import Analytics from './components/Analytics';
import WalletManager from './components/WalletManager';
import { exportToCSV, exportToJSON } from './utils/exportUtils';

const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Groceries',
  'Others'
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [budgets, setBudgets] = useState({});
  const [wallet, setWallet] = useState({ amount: 0, month: '', setDate: '' });
  const [income, setIncome] = useState([]);
  const [filter, setFilter] = useState({
    category: 'all',
    dateFrom: '',
    dateTo: '',
    searchTerm: ''
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [activeTab, setActiveTab] = useState('wallet');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedCategories = localStorage.getItem('categories');
    const savedBudgets = localStorage.getItem('budgets');
    const savedWallet = localStorage.getItem('wallet');
    const savedIncome = localStorage.getItem('income');

    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
    if (savedWallet) setWallet(JSON.parse(savedWallet));
    if (savedIncome) setIncome(JSON.parse(savedIncome));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('income', JSON.stringify(income));
  }, [income]);

  const addExpense = (expense) => {
    if (editingExpense) {
      setExpenses(expenses.map(exp => 
        exp.id === editingExpense.id ? { ...expense, id: editingExpense.id } : exp
      ));
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, { ...expense, id: Date.now() }]);
    }
  };

  const deleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
    setActiveTab('expenses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingExpense(null);
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const deleteCategory = (category) => {
    if (window.confirm(`Delete category "${category}"? All expenses in this category will remain but need to be recategorized.`)) {
      setCategories(categories.filter(cat => cat !== category));
    }
  };

  const updateBudget = (category, amount) => {
    setBudgets({ ...budgets, [category]: parseFloat(amount) });
  };

  const deleteBudget = (category) => {
    const newBudgets = { ...budgets };
    delete newBudgets[category];
    setBudgets(newBudgets);
  };

  const updateWallet = (walletData) => {
    setWallet(walletData);
  };

  const addIncome = (incomeData) => {
    setIncome([...income, incomeData]);
  };

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = filter.category === 'all' || expense.category === filter.category;
    const matchesDateFrom = !filter.dateFrom || expense.date >= filter.dateFrom;
    const matchesDateTo = !filter.dateTo || expense.date <= filter.dateTo;
    const matchesSearch = !filter.searchTerm || 
      expense.description.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(filter.searchTerm.toLowerCase());

    return matchesCategory && matchesDateFrom && matchesDateTo && matchesSearch;
  });

  const handleExport = (format) => {
    if (format === 'csv') {
      exportToCSV(filteredExpenses);
    } else if (format === 'json') {
      exportToJSON(filteredExpenses);
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setExpenses([]);
      setBudgets({});
      setCategories(DEFAULT_CATEGORIES);
      setWallet({ amount: 0, month: '', setDate: '' });
      setIncome([]);
      localStorage.clear();
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>💰 Advanced Expense Tracker</h1>
        <p>Manage your finances efficiently</p>
      </header>

      <div className="tab-navigation">
        <button 
          className={activeTab === 'wallet' ? 'active' : ''} 
          onClick={() => setActiveTab('wallet')}
        >
          💰 वॉलेट (Wallet)
        </button>
        <button 
          className={activeTab === 'expenses' ? 'active' : ''} 
          onClick={() => setActiveTab('expenses')}
        >
          📝 खर्चे (Expenses)
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
        <button 
          className={activeTab === 'budget' ? 'active' : ''} 
          onClick={() => setActiveTab('budget')}
        >
          💵 Budget
        </button>
        <button 
          className={activeTab === 'categories' ? 'active' : ''} 
          onClick={() => setActiveTab('categories')}
        >
          🏷️ Categories
        </button>
      </div>

      <div className="container">
        {activeTab === 'wallet' && (
          <WalletManager 
            wallet={wallet}
            onUpdateWallet={updateWallet}
            onAddIncome={addIncome}
            income={income}
          />
        )}

        {activeTab === 'expenses' && (
          <>
            <div className="main-content">
              <div className="form-section">
                <ExpenseForm 
                  onAddExpense={addExpense}
                  categories={categories}
                  editingExpense={editingExpense}
                  onCancelEdit={cancelEdit}
                />
              </div>

              <div className="summary-section">
                <ExpenseSummary 
                  expenses={filteredExpenses}
                  budgets={budgets}
                  wallet={wallet}
                  income={income}
                />
              </div>
            </div>

            <div className="filter-section">
              <ExpenseFilter 
                filter={filter}
                setFilter={setFilter}
                categories={categories}
                onExport={handleExport}
              />
            </div>

            <div className="list-section">
              <ExpenseList 
                expenses={filteredExpenses}
                onDeleteExpense={deleteExpense}
                onEditExpense={editExpense}
              />
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <Analytics expenses={expenses} categories={categories} />
        )}

        {activeTab === 'budget' && (
          <BudgetManager 
            budgets={budgets}
            categories={categories}
            expenses={expenses}
            onUpdateBudget={updateBudget}
            onDeleteBudget={deleteBudget}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryManager 
            categories={categories}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
            expenses={expenses}
          />
        )}

        <div className="danger-zone">
          <button className="btn-danger" onClick={clearAllData}>
            🗑️ Clear All Data
          </button>
        </div>
      </div>

      <footer className="app-footer">
        <p>© 2026 Expense Tracker - All data is stored locally in your browser</p>
      </footer>
    </div>
  );
}

export default App;
