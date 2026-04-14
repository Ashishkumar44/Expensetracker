const mongoose = require('mongoose');

let cachedConnection = null;
let connectingPromise = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (connectingPromise) {
    return connectingPromise;
  }

  try {
    connectingPromise = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const conn = await connectingPromise;
    cachedConnection = conn;
    connectingPromise = null;

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    connectingPromise = null;
    console.error(`❌ Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
