import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, startOfWeek } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

function Analytics({ expenses, categories }) {
  const [timeRange, setTimeRange] = useState('all'); // all, month, 3months, 6months, year
  const [trendView, setTrendView] = useState('week'); // week, month

  // Filter expenses based on time range
  const getFilteredExpenses = () => {
    if (timeRange === 'all') return expenses;
    
    const now = new Date();
    let startDate;
    
    switch(timeRange) {
      case 'month':
        startDate = startOfMonth(now);
        break;
      case '3months':
        startDate = subMonths(now, 3);
        break;
      case '6months':
        startDate = subMonths(now, 6);
        break;
      case 'year':
        startDate = subMonths(now, 12);
        break;
      default:
        return expenses;
    }
    
    return expenses.filter(exp => new Date(exp.date) >= startDate);
  };

  const filteredExpenses = getFilteredExpenses();

  // Category-wise data for pie chart
  const categoryData = categories.map(category => {
    const total = filteredExpenses
      .filter(exp => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { name: category, value: parseFloat(total.toFixed(2)) };
  }).filter(item => item.value > 0);

  // Payment method data
  const paymentMethodData = filteredExpenses.reduce((acc, exp) => {
    const existing = acc.find(item => item.name === exp.paymentMethod);
    if (existing) {
      existing.value += exp.amount;
    } else {
      acc.push({ name: exp.paymentMethod, value: exp.amount });
    }
    return acc;
  }, []).map(item => ({ ...item, value: parseFloat(item.value.toFixed(2)) }));

  // Monthly trend data
  const monthlyData = filteredExpenses.reduce((acc, exp) => {
    const month = format(new Date(exp.date), 'MMM yyyy');
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.amount += exp.amount;
    } else {
      acc.push({ month, amount: exp.amount });
    }
    return acc;
  }, []).map(item => ({ ...item, amount: parseFloat(item.amount.toFixed(2)) }));

  // Daily spending for current month
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const dailyData = daysInMonth.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayExpenses = expenses.filter(exp => exp.date === dateStr);
    const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return {
      date: format(day, 'dd MMM'),
      amount: parseFloat(total.toFixed(2))
    };
  });

  // Statistics
  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageExpense = filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;
  const highestExpense = filteredExpenses.length > 0 ? Math.max(...filteredExpenses.map(exp => exp.amount)) : 0;
  const lowestExpense = filteredExpenses.length > 0 ? Math.min(...filteredExpenses.map(exp => exp.amount)) : 0;

  const trendData = useMemo(() => {
    const grouped = filteredExpenses.reduce((acc, exp) => {
      const expenseDate = new Date(exp.date);
      const bucketStart = trendView === 'week'
        ? startOfWeek(expenseDate, { weekStartsOn: 1 })
        : startOfMonth(expenseDate);

      const bucketKey = format(bucketStart, 'yyyy-MM-dd');
      const bucketLabel = trendView === 'week'
        ? `Wk ${format(bucketStart, 'dd MMM')}`
        : format(bucketStart, 'MMM yyyy');

      if (!acc[bucketKey]) {
        acc[bucketKey] = {
          bucketDate: bucketStart,
          label: bucketLabel,
          amount: 0,
        };
      }

      acc[bucketKey].amount += exp.amount;
      return acc;
    }, {});

    const sorted = Object.values(grouped)
      .sort((a, b) => a.bucketDate - b.bucketDate)
      .map((item) => ({
        ...item,
        amount: parseFloat(item.amount.toFixed(2)),
      }));

    return sorted.map((item, index) => {
      const previousAmount = index > 0 ? sorted[index - 1].amount : 0;
      const change = parseFloat((item.amount - previousAmount).toFixed(2));
      const changePercent = previousAmount > 0
        ? parseFloat((((item.amount - previousAmount) / previousAmount) * 100).toFixed(1))
        : 0;

      return {
        ...item,
        change,
        changePercent,
        direction: change > 0 ? 'up' : change < 0 ? 'down' : 'flat',
      };
    });
  }, [filteredExpenses, trendView]);

  const latestTrendPoint = trendData.length > 0 ? trendData[trendData.length - 1] : null;
  const trendDirectionText = !latestTrendPoint
    ? 'No trend data yet'
    : latestTrendPoint.direction === 'up'
      ? `Expense increased by ₹${Math.abs(latestTrendPoint.change).toFixed(2)} (${Math.abs(latestTrendPoint.changePercent).toFixed(1)}%)`
      : latestTrendPoint.direction === 'down'
        ? `Expense decreased by ₹${Math.abs(latestTrendPoint.change).toFixed(2)} (${Math.abs(latestTrendPoint.changePercent).toFixed(1)}%)`
        : 'Expense is stable vs previous period';

  if (filteredExpenses.length === 0) {
    return (
      <div className="analytics">
        <h2>📊 Analytics</h2>
        <p className="empty-state">No data available for analysis. Add some expenses to see insights!</p>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>📊 Analytics & Insights</h2>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'all' ? 'active' : ''} 
            onClick={() => setTimeRange('all')}
          >
            All Time
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''} 
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
          <button 
            className={timeRange === '3months' ? 'active' : ''} 
            onClick={() => setTimeRange('3months')}
          >
            3 Months
          </button>
          <button 
            className={timeRange === '6months' ? 'active' : ''} 
            onClick={() => setTimeRange('6months')}
          >
            6 Months
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''} 
            onClick={() => setTimeRange('year')}
          >
            1 Year
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Expenses</h4>
          <p className="stat-value">₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h4>Average Expense</h4>
          <p className="stat-value">₹{averageExpense.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h4>Highest Expense</h4>
          <p className="stat-value">₹{highestExpense.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h4>Lowest Expense</h4>
          <p className="stat-value">₹{lowestExpense.toFixed(2)}</p>
        </div>
      </div>

      <div className="charts-grid">
        {trendData.length > 0 && (
          <div className="chart-container full-width trend-3d-chart">
            <h3>3D Expense Momentum ({trendView === 'week' ? 'Weekly' : 'Monthly'})</h3>
            <div className="trend-toggle">
              <button
                type="button"
                className={trendView === 'week' ? 'active' : ''}
                onClick={() => setTrendView('week')}
              >
                Weekly
              </button>
              <button
                type="button"
                className={trendView === 'month' ? 'active' : ''}
                onClick={() => setTrendView('month')}
              >
                Monthly
              </button>
            </div>

            <div className={`trend-summary ${latestTrendPoint?.direction || 'flat'}`}>
              <strong>{trendDirectionText}</strong>
            </div>

            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={trendData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="trendAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f2a41c" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#159488" stopOpacity={0.08} />
                  </linearGradient>
                  <linearGradient id="trendBarFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f2a41c" />
                    <stop offset="100%" stopColor="#159488" />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d9e6e9" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} angle={-12} textAnchor="end" height={58} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name, payload) => {
                    if (name === 'amount') return [`₹${value}`, 'Expense'];
                    if (payload?.payload?.change !== undefined) {
                      return [`₹${payload.payload.change}`, 'Change'];
                    }
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Period: ${label}`}
                />
                <Legend />

                <Area
                  type="monotone"
                  dataKey="amount"
                  fill="url(#trendAreaFill)"
                  stroke="none"
                  name="Flow"
                  animationDuration={1400}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#trendBarFill)"
                  radius={[8, 8, 2, 2]}
                  barSize={28}
                  name="Expense"
                  animationDuration={1200}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#0f7f86"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  name="Trend"
                  animationDuration={1500}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="chart-container">
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Payment Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentMethodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {monthlyData.length > 1 && (
          <div className="chart-container full-width">
            <h3>Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="chart-container full-width">
          <h3>Daily Spending - Current Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="insights">
        <h3>💡 Insights</h3>
        <ul>
          {categoryData.length > 0 && (
            <li>
              Your highest spending category is <strong>{categoryData[0].name}</strong> with ₹{categoryData[0].value.toFixed(2)}
            </li>
          )}
          <li>
            You have made <strong>{filteredExpenses.length}</strong> transactions in the selected period
          </li>
          <li>
            Your average transaction amount is <strong>₹{averageExpense.toFixed(2)}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
