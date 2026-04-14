const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      set: (value) => parseFloat(value),
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      enum: ['Salary', 'Bonus', 'Business', 'Freelance', 'Investment', 'Gift', 'Other'],
      default: 'Other',
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      default: 'Income',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Income', incomeSchema);
