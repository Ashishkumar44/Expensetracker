import React from 'react';

function ExpenseFilter({ filter, setFilter, categories, onExport }) {
  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilter({
      category: 'all',
      dateFrom: '',
      dateTo: '',
      searchTerm: ''
    });
  };

  return (
    <div className="expense-filter">
      <h3>🔍 Filter & Search</h3>
      <div className="filter-grid">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            name="searchTerm"
            value={filter.searchTerm}
            onChange={handleFilterChange}
            placeholder="Search expenses..."
          />
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>From Date</label>
          <input
            type="date"
            name="dateFrom"
            value={filter.dateFrom}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label>To Date</label>
          <input
            type="date"
            name="dateTo"
            value={filter.dateTo}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="filter-actions">
        <button className="btn-secondary" onClick={clearFilters}>
          🔄 Clear Filters
        </button>
        <button className="btn-export" onClick={() => onExport('csv')}>
          📊 Export CSV
        </button>
        <button className="btn-export" onClick={() => onExport('json')}>
          📄 Export JSON
        </button>
      </div>
    </div>
  );
}

export default ExpenseFilter;
