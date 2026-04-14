const dotenv = require('dotenv');
const connectDB = require('../backend/config/database');
const app = require('../backend/app');

dotenv.config();

let isDbReady = false;

module.exports = async (req, res) => {
  try {
    if (!isDbReady) {
      await connectDB();
      isDbReady = true;
    }

    return app(req, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
    });
  }
};