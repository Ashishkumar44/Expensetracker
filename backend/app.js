const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/income', require('./routes/income'));
app.use('/api/wallet', require('./routes/wallet'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

module.exports = app;