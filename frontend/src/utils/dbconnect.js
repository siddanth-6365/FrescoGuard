import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!mongoose.connections[0].readyState) {
    // If not connected, use the new database connection
    cachedConnection = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    return cachedConnection;
  }

  // If already connected, use the existing database connection
  cachedConnection = Promise.resolve();

  return cachedConnection;
};

export default connectDB;
