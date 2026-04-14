const Income = require('../models/Income');

// @desc    Get all income for user
exports.getIncome = async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add income
exports.addIncome = async (req, res) => {
  try {
    const { amount, description, source, date } = req.body;

    if (!amount || !description || !date) {
      return res.status(400).json({ message: 'कृपया सभी आवश्यक फील्ड भरें (Please fill all required fields)' });
    }

    const income = await Income.create({
      userId: req.user.id,
      amount: parseFloat(amount),
      description,
      source,
      date,
    });

    res.status(201).json({ success: true, data: income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update income
exports.updateIncome = async (req, res) => {
  try {
    let income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: 'आय नहीं मिली (Income not found)' });
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this income' });
    }

    income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete income
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: 'आय नहीं मिली (Income not found)' });
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this income' });
    }

    await Income.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'आय हटा दी गई (Income deleted)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
