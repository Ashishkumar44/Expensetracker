import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Login from './components/Login';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetManager from './components/BudgetManager';
import CategoryManager from './components/CategoryManager';
import Analytics from './components/Analytics';
import WalletManager from './components/WalletManager';
import { exportToCSV, exportToJSON } from './utils/exportUtils';
import { expenseAPI, incomeAPI, walletAPI, authAPI } from './services/api';

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
  const [user, setUser] = useState(null);
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
  const [loading, setLoading] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileModalMode, setProfileModalMode] = useState('profile');
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const profileMenuRef = useRef(null);

  const getUserInitials = (name = '') => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (!parts.length) return 'U';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
        setIsProfileModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isProfileModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isProfileModalOpen]);

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [expensesRes, incomeRes, walletRes] = await Promise.all([
        expenseAPI.getExpenses(),
        incomeAPI.getIncome(),
        walletAPI.getWallet(),
      ]);

      setExpenses(expensesRes.data.data || []);
      setIncome(incomeRes.data.data || []);
      setWallet(walletRes.data.data || { amount: 0, month: '', setDate: '' });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    fetchUserData();
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    setIsProfileModalOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setExpenses([]);
    setIncome([]);
    setWallet({ amount: 0, month: '', setDate: '' });
  };

  const addExpense = async (expense) => {
    try {
      if (editingExpense) {
        await expenseAPI.updateExpense(editingExpense._id || editingExpense.id, {
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
          date: expense.date,
          paymentMethod: expense.paymentMethod,
        });
        setEditingExpense(null);
      } else {
        const response = await expenseAPI.addExpense(expense);
        setExpenses([...expenses, response.data.data]);
      }
      fetchUserData();
    } catch (error) {
      alert('Error adding expense: ' + error.message);
    }
  };

  const deleteExpense = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await expenseAPI.deleteExpense(id);
        setExpenses(expenses.filter(exp => (exp._id || exp.id) !== id));
      } catch (error) {
        alert('Error deleting expense: ' + error.message);
      }
    }
  };

  const clearAllExpenses = async () => {
    if (window.confirm('Clear all expenses? This action cannot be undone.')) {
      try {
        await expenseAPI.clearExpenses();
        setExpenses([]);
        alert('All expenses cleared successfully!');
      } catch (error) {
        alert('Error clearing expenses: ' + error.message);
      }
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
    if (window.confirm(`Delete category "${category}"?`)) {
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

  const updateWallet = async (walletData) => {
    try {
      const currentDate = new Date();
      const monthYear = `${currentDate.getMonth()}-${currentDate.getFullYear()}`;
      
      const response = await walletAPI.setWallet({
        amount: walletData.amount,
        month: monthYear,
        description: walletData.description,
      });
      
      setWallet(response.data.data);
      alert('Wallet set successfully!');
    } catch (error) {
      alert('Error setting wallet: ' + error.message);
    }
  };

  const addIncome = async (incomeData) => {
    try {
      const response = await incomeAPI.addIncome({
        amount: incomeData.amount,
        description: incomeData.description,
        source: incomeData.source,
        date: incomeData.date,
      });
      
      setIncome([...income, response.data.data]);
      alert('Income added successfully!');
    } catch (error) {
      alert('Error adding income: ' + error.message);
    }
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
    if (window.confirm('Are you sure you want to clear all data?')) {
      setExpenses([]);
      setBudgets({});
      setCategories(DEFAULT_CATEGORIES);
      setWallet({ amount: 0, month: '', setDate: '' });
      setIncome([]);
    }
  };

  const handleViewProfile = () => {
    setIsProfileMenuOpen(false);
    setProfileModalMode('profile');
    setIsProfileModalOpen(true);
  };

  const handleSettings = () => {
    setIsProfileMenuOpen(false);
    setProfileModalMode('settings');
    setIsProfileModalOpen(true);
  };

  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const saveProfile = async () => {
      const trimmedName = profileForm.name.trim();
      const trimmedEmail = profileForm.email.trim();
      if (!trimmedName || !trimmedEmail) {
        alert('Name and email are required.');
        return;
      }

      try {
        setIsSavingProfile(true);
        const response = await authAPI.updateProfile({
          name: trimmedName,
          email: trimmedEmail,
        });

        const payload = response?.data?.data || {};
        const updatedUser = {
          ...user,
          name: payload.name || trimmedName,
          email: payload.email || trimmedEmail,
        };

        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsProfileModalOpen(false);
        alert('Profile updated successfully!');
      } catch (error) {
        const message = error?.response?.data?.message || 'Failed to update profile.';
        alert(message);
      } finally {
        setIsSavingProfile(false);
      }
    };

    saveProfile();
  };

  // If not logged in, show login screen
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // If loading, show loading screen
  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading data...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>💰 Advanced Expense Tracker</h1>
          <p>Manage your finances efficiently</p>
        </div>
        <div className="user-section">
          <div className="profile-menu-wrap" ref={profileMenuRef}>
            <button
              className="profile-chip"
              type="button"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
            >
              <div className="profile-avatar" aria-label="User avatar">
                <span className="avatar-initials">{getUserInitials(user.name)}</span>
              </div>
              <span className="user-name">{user.name}</span>
              <span className="profile-caret">{isProfileMenuOpen ? '▲' : '▼'}</span>
            </button>

            {isProfileMenuOpen && (
              <div className="profile-dropdown" role="menu" aria-label="Profile menu">
                <button type="button" className="profile-menu-item" onClick={handleViewProfile}>
                  View Profile
                </button>
                <button type="button" className="profile-menu-item" onClick={handleSettings}>
                  Settings
                </button>
                <button type="button" className="profile-menu-item danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          <button className="btn-logout" onClick={handleLogout}>
            Quick Logout
          </button>
        </div>
      </header>

      <div className="tab-navigation">
        <button 
          className={activeTab === 'wallet' ? 'active' : ''} 
          onClick={() => setActiveTab('wallet')}
        >
          💰 Wallet
        </button>
        <button 
          className={activeTab === 'expenses' ? 'active' : ''} 
          onClick={() => setActiveTab('expenses')}
        >
          📝 Expenses
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
                  expenses={expenses}
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
                onClearAllExpenses={clearAllExpenses}
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
        <p>© 2026 Expense Tracker - Secure & Private</p>
      </footer>

      {isProfileModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsProfileModalOpen(false)}>
          <div
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-label={profileModalMode === 'profile' ? 'Edit profile' : 'Settings'}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-modal-header">
              <h3>{profileModalMode === 'profile' ? 'Edit Profile' : 'Settings'}</h3>
              <button type="button" className="profile-modal-close" onClick={() => setIsProfileModalOpen(false)}>
                ✕
              </button>
            </div>

            {profileModalMode === 'profile' ? (
              <form className="profile-modal-form" onSubmit={handleSaveProfile}>
                <div className="profile-modal-field">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileFormChange}
                    placeholder="Your name"
                  />
                </div>

                <div className="profile-modal-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileFormChange}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="profile-modal-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsProfileModalOpen(false)}
                    disabled={isSavingProfile}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={isSavingProfile}>
                    {isSavingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="settings-placeholder">
                <p>Settings panel is ready for your next preferences.</p>
                <p className="settings-note">You can add currency format, theme, and notifications here.</p>
                <div className="profile-modal-actions">
                  <button type="button" className="btn-primary" onClick={() => setIsProfileModalOpen(false)}>
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
