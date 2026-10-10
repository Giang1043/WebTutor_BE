const mongoose = require("mongoose");

const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is required to start the backend");
  }

  await mongoose.connect(uri);
  return mongoose.connection;
};

const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

module.exports = { connectDatabase, disconnectDatabase };
