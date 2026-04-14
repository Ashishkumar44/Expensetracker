const express = require('express');
const { getExpenses, addExpense, updateExpense, deleteExpense, clearExpenses } = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getExpenses);
router.post('/', addExpense);
router.delete('/', clearExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
