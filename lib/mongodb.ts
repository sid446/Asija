import mongoose from 'mongoose';
import '@/models'; // Import all models to ensure registration

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Check if we're in a disconnected state and reset cache
  if (cached.conn && mongoose.connection.readyState === 0) {
    console.log('Connection is disconnected, resetting cache');
    cached.conn = null;
    cached.promise = null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // Connection Pool Settings
      maxPoolSize: 10, // Maximum number of connections in the connection pool
      minPoolSize: 2,  // Minimum number of connections to maintain in the pool
      maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds

      // Connection Settings
      bufferCommands: false, // Disable mongoose buffering
      family: 4, // Use IPv4, skip trying IPv6

      // Heartbeat and Monitoring
      heartbeatFrequencyMS: 10000, // Check connection every 10 seconds

      // Retry and Reconnection
      retryWrites: true, // Enable retryable writes
      retryReads: true, // Enable retryable reads

      // SSL and Security (if needed)
      // ssl: true,
      // sslValidate: true,

      // Compression
      compressors: 'zlib', // Enable compression
    };

    console.log('Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('Connected to MongoDB');

      // Monitor connection events
      mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB');
        logConnectionStats();
      });

      mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
        // Reset cache on connection error
        cached.conn = null;
        cached.promise = null;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from MongoDB');
        // Reset cache on disconnect
        cached.conn = null;
        cached.promise = null;
      });

      // Monitor connection pool
      mongoose.connection.on('reconnected', () => {
        console.log('Mongoose reconnected to MongoDB');
        logConnectionStats();
      });

      // Monitor pool events
      mongoose.connection.on('poolCreated', (event) => {
        console.log('Connection pool created:', event);
      });

      mongoose.connection.on('poolReady', (event) => {
        console.log('Connection pool ready:', event);
      });

      mongoose.connection.on('poolCleared', (event) => {
        console.log('Connection pool cleared:', event);
      });

      mongoose.connection.on('poolClosed', (event) => {
        console.log('Connection pool closed:', event);
      });

      return mongoose;
    }).catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

// Graceful shutdown handler
if (typeof process !== 'undefined' && process.on) {
  process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    if (cached.conn) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Closing MongoDB connection...');
    if (cached.conn) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    process.exit(0);
  });
}

// Function to get connection pool stats
export function getConnectionStats() {
  if (!cached.conn) {
    return {
      status: 'disconnected' as const,
      poolSize: 0,
      availableConnections: 0,
      pendingConnections: 0,
      borrowedConnections: 0
    };
  }

  const conn = mongoose.connection;
  const pool = (conn.db?.client as any)?.topology?.s?.pool;

  return {
    status: conn.readyState === 1 ? 'connected' as const : conn.readyState === 2 ? 'connecting' as const : 'disconnected' as const,
    poolSize: pool?.size || 0,
    availableConnections: pool?.available || 0,
    pendingConnections: pool?.pending || 0,
    borrowedConnections: pool?.borrowed || 0,
    name: conn.name,
    host: conn.host,
    port: conn.port
  };
}

// Function to log connection pool status
export function logConnectionStats() {
  const stats = getConnectionStats();
  console.log('MongoDB Connection Stats:', {
    status: stats.status,
    poolSize: stats.poolSize,
    available: stats.availableConnections,
    pending: stats.pendingConnections,
    borrowed: stats.borrowedConnections,
    server: stats.name ? `${stats.host}:${stats.port}/${stats.name}` : 'unknown'
  });
}

export default dbConnect;

// Alias for backward compatibility
export const connectToDatabase = dbConnect;
