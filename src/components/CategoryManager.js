import React, { useState } from 'react';

function CategoryManager({ categories, onAddCategory, onDeleteCategory, expenses }) {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      alert('Please enter a category name');
      return;
    }
    if (categories.includes(newCategory.trim())) {
      alert('This category already exists');
      return;
    }
    onAddCategory(newCategory.trim());
    setNewCategory('');
  };

  // Count expenses per category
  const categoryCount = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + 1;
    return acc;
  }, {});

  const categoryTotal = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div className="category-manager">
      <h2>🏷️ Category Management</h2>
      
      <div className="category-form">
        <h3>Add New Category</h3>
        <form onSubmit={handleAddCategory}>
          <div className="form-row">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
            <button type="submit" className="btn-primary">
              ➕ Add Category
            </button>
          </div>
        </form>
      </div>

      <div className="category-list">
        <h3>All Categories ({categories.length})</h3>
        <div className="category-grid">
          {categories.map(category => {
            const count = categoryCount[category] || 0;
            const total = categoryTotal[category] || 0;

            return (
              <div key={category} className="category-card">
                <div className="category-card-header">
                  <h4>{category}</h4>
                  <button 
                    className="btn-delete-small"
                    onClick={() => onDeleteCategory(category)}
                    title="Delete category"
                  >
                    🗑️
                  </button>
                </div>
                <div className="category-card-body">
                  <div className="category-stat">
                    <span className="stat-label">Expenses:</span>
                    <span className="stat-value">{count}</span>
                  </div>
                  <div className="category-stat">
                    <span className="stat-label">Total:</span>
                    <span className="stat-value">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="category-info">
        <h3>ℹ️ Category Guidelines</h3>
        <ul>
          <li>Create specific categories for better tracking</li>
          <li>Keep category names short and descriptive</li>
          <li>Delete unused categories to keep your list clean</li>
          <li>You can reorganize expenses after deleting a category</li>
        </ul>
      </div>
    </div>
  );
}

export default CategoryManager;
