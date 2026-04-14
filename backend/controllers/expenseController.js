const Expense = require('../models/Expense');

// @desc    Get all expenses for user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category, date, paymentMethod } = req.body;

    if (!amount || !description || !category || !date) {
      return res.status(400).json({ message: 'कृपया सभी आवश्यक फील्ड भरें (Please fill all required fields)' });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      amount: parseFloat(amount),
      description,
      category,
      date,
      paymentMethod,
    });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update expense
exports.updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'खर्चा नहीं मिला (Expense not found)' });
    }

    // Make sure user owns expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this expense' });
    }

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'खर्चा नहीं मिला (Expense not found)' });
    }

    // Make sure user owns expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this expense' });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'खर्चा हटा दिया गया (Expense deleted)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear all expenses for user
exports.clearExpenses = async (req, res) => {
  try {
    const result = await Expense.deleteMany({ userId: req.user.id });
    res.status(200).json({
      success: true,
      message: 'All expenses cleared',
      deletedCount: result.deletedCount || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
