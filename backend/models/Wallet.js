const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
      set: (value) => parseFloat(value).toFixed(2),
    },
    month: {
      type: String,
      required: true,
    },
    setDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wallet', walletSchema);
