const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    console.warn('No MONGO_URI provided; attempting in-memory MongoDB for development');
  }

  const tryConnect = async (uri) => {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected to', uri);
      return true;
    } catch (err) {
      console.error('MongoDB connection error', err.message || err);
      return false;
    }
  };

  // Try provided URI first
  if (mongoUri) {
    const ok = await tryConnect(mongoUri);
    if (ok) return;
    console.warn('Falling back to in-memory MongoDB');
  }

  // Start in-memory server for development/testing
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const ok = await tryConnect(uri);
  if (!ok) {
    console.error('Failed to connect to in-memory MongoDB');
  }
};

module.exports = connectDB;
