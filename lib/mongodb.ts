import mongoose from 'mongoose';

// Define the type for the cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Initialize the cached connection object
// In development, use a global variable to preserve the connection across hot reloads
// In production, the connection will be created fresh on each cold start
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * 
 * This function implements connection caching to prevent multiple connections
 * during development hot reloads. It reuses existing connections when available.
 * 
 * @returns {Promise<typeof mongoose>} The Mongoose instance with an active connection
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return the cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If there's no cached promise, create a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering to fail fast in serverless environments
    };

    // @ts-ignore
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection promise to resolve and cache the connection
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise on error so the next call will retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
