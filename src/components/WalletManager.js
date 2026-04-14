import React, { useState } from 'react';

function WalletManager({ wallet, onUpdateWallet, onAddIncome, income }) {
  const [balanceAmount, setBalanceAmount] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDescription, setIncomeDescription] = useState('');
  const [incomeSource, setIncomeSource] = useState('Salary');

  const handleSetBalance = (e) => {
    e.preventDefault();
    if (!balanceAmount || parseFloat(balanceAmount) < 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    const currentDate = new Date();
    const monthYear = `${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    
    onUpdateWallet({
      amount: parseFloat(balanceAmount),
      month: monthYear,
      setDate: new Date().toISOString()
    });
    
    setBalanceAmount('');
    alert('Monthly balance set successfully!');
  };

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (!incomeAmount || parseFloat(incomeAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (!incomeDescription) {
      alert('Please enter a description');
      return;
    }

    onAddIncome({
      amount: parseFloat(incomeAmount),
      description: incomeDescription,
      source: incomeSource,
      date: new Date().toISOString().split('T')[0],
      id: Date.now()
    });

    setIncomeAmount('');
    setIncomeDescription('');
    setIncomeSource('Salary');
    alert('Income added successfully!');
  };

  const getTotalIncome = () => {
    return income.reduce((sum, inc) => sum + inc.amount, 0);
  };

  return (
    <div className="wallet-manager">
      <h2>💰 Wallet Management</h2>

      <div className="wallet-sections">
        {/* Set Monthly Balance */}
        <div className="wallet-section">
          <div className="section-header">
            <h3>📅 Set Monthly Balance</h3>
            <p className="hint">Set your total available money at the beginning of the month.</p>
          </div>
          <form onSubmit={handleSetBalance}>
            <div className="wallet-form-group">
              <label>Amount *</label>
              <input
                type="number"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                placeholder="Example: 50000"
                step="0.01"
              />
            </div>
            <button type="submit" className="btn-primary">
              💰 Set Balance
            </button>
          </form>

          {wallet.amount > 0 && (
            <div className="current-wallet-info">
              <h4>Current Month Balance</h4>
              <p className="wallet-amount">₹{wallet.amount.toFixed(2)}</p>
              <p className="wallet-date">
                Set on: {new Date(wallet.setDate).toLocaleDateString('en-IN')}
              </p>
            </div>
          )}
        </div>

        {/* Add Extra Money */}
        <div className="wallet-section">
          <div className="section-header">
            <h3>💵 Add Extra Money</h3>
            <p className="hint">Add any new amount you receive so total and remaining stay accurate.</p>
          </div>
          <form onSubmit={handleAddIncome}>
            <div className="wallet-form-group">
              <label>Amount *</label>
              <input
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                placeholder="Example: 5000"
                step="0.01"
              />
            </div>

            <div className="wallet-form-group">
              <label>Description *</label>
              <input
                type="text"
                value={incomeDescription}
                onChange={(e) => setIncomeDescription(e.target.value)}
                placeholder="Example: Salary, Bonus, Freelance"
              />
            </div>

            <div className="wallet-form-group">
              <label>Source</label>
              <select
                value={incomeSource}
                onChange={(e) => setIncomeSource(e.target.value)}
              >
                <option value="Salary">Salary</option>
                <option value="Bonus">Bonus</option>
                <option value="Business">Business</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Gift">Gift</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" className="btn-success">
              ➕ Add Money
            </button>
          </form>

          {income.length > 0 && (
            <div className="income-summary">
              <h4>Total Extra Added</h4>
              <p className="income-amount">₹{getTotalIncome().toFixed(2)}</p>
              <p className="income-count">{income.length} transactions</p>
            </div>
          )}
        </div>
      </div>

      {/* Income List */}
      {income.length > 0 && (
        <div className="income-list-section">
          <h3>📋 Extra Money History</h3>
          <div className="income-items">
            {income.slice().reverse().map(inc => (
              <div key={inc._id || inc.id} className="income-item">
                <div className="income-details">
                  <h4>{inc.description}</h4>
                  <span className="income-source-badge">{inc.source}</span>
                  <span className="income-date">
                    {new Date(inc.date).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className="income-amount-display">
                  + ₹{inc.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="wallet-tips">
        <h3>💡 Tips</h3>
        <ul>
          <li>Set your opening monthly balance first.</li>
          <li>Add income as soon as you receive it.</li>
          <li>Add all spending in the Expenses tab.</li>
          <li>Use Summary to track your remaining balance.</li>
        </ul>
      </div>
    </div>
  );
}

export default WalletManager;
