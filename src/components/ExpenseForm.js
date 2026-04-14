import React, { useState, useEffect } from 'react';

function ExpenseForm({ onAddExpense, categories, editingExpense, onCancelEdit }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: categories[0] || '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash'
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        description: editingExpense.description,
        category: editingExpense.category,
        date: editingExpense.date,
        paymentMethod: editingExpense.paymentMethod
      });
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    onAddExpense({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    // Reset form
    setFormData({
      amount: '',
      description: '',
      category: categories[0] || '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Cash'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="expense-form">
      <h2>{editingExpense ? '✏️ Edit Expense' : '➕ Add New Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount (₹) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What did you spend on?"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingExpense ? '💾 Update Expense' : '➕ Add Expense'}
          </button>
          {editingExpense && (
            <button type="button" className="btn-secondary" onClick={onCancelEdit}>
              ❌ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
