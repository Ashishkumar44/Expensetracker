const Wallet = require('../models/Wallet');

// @desc    Get wallet for user
exports.getWallet = async (req, res) => {
  try {
    const now = new Date();
    const currentMonthKey = `${now.getMonth()}-${now.getFullYear()}`;

    // Prefer the wallet explicitly set for the current month.
    let wallet = await Wallet.findOne({ userId: req.user.id, month: currentMonthKey });

    // Fallback to the latest wallet record if current month does not exist.
    if (!wallet) {
      wallet = await Wallet.findOne({ userId: req.user.id }).sort({ setDate: -1, createdAt: -1 });
    }

    res.status(200).json({ success: true, data: wallet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set wallet balance
exports.setWallet = async (req, res) => {
  try {
    const { amount, month, description } = req.body;

    if (!amount || !month) {
      return res.status(400).json({ message: 'Amount and month are required' });
    }

    let wallet = await Wallet.findOne({ userId: req.user.id, month });

    if (wallet) {
      wallet.amount = parseFloat(amount);
      wallet.description = description;
      wallet.setDate = new Date();
      await wallet.save();
    } else {
      wallet = await Wallet.create({
        userId: req.user.id,
        amount: parseFloat(amount),
        month,
        description,
        setDate: new Date(),
      });
    }

    res.status(201).json({ success: true, data: wallet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all wallets for user
exports.getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({ userId: req.user.id }).sort({ month: -1 });
    res.status(200).json({ success: true, data: wallets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
