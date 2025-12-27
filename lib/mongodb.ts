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

// Check if we're in a serverless environment
const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME || !!process.env.NETLIFY;

async function dbConnect() {
  // Adjust connection pool settings based on environment
  const baseOpts = {
    // Connection Settings
    bufferCommands: false, // Disable mongoose buffering
    family: 4, // Use IPv4, skip trying IPv6

    // Heartbeat and Monitoring
    heartbeatFrequencyMS: 10000, // Check connection every 10 seconds

    // Retry and Reconnection
    retryWrites: true, // Enable retryable writes
    retryReads: true, // Enable retryable reads

    // SSL and Security
    ssl: true,

    // Compression
    compressors: 'zlib', // Enable compression
  };

  // Different pool settings for serverless vs traditional servers
  const poolOpts = isServerless ? {
    // Serverless: Minimal pooling to avoid connection bloat
    maxPoolSize: 1, // Only 1 connection per function
    minPoolSize: 0, // No minimum connections
    maxIdleTimeMS: 5000, // Close idle connections quickly (5 seconds)
    socketTimeoutMS: 15000, // Shorter socket timeout (15 seconds)
    serverSelectionTimeoutMS: 3000, // Faster server selection (3 seconds)
  } : {
    // Traditional server: Full pooling
    maxPoolSize: 10, // Maximum number of connections in the connection pool
    minPoolSize: 2,  // Minimum number of connections to maintain in the pool
    maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  };

  const opts = { ...baseOpts, ...poolOpts };

  // In serverless environments, connections don't persist between function invocations
  // So we create a new connection for each request
  if (isServerless) {
    console.log('Serverless: Creating new connection for this request');
    return await mongoose.connect(MONGODB_URI!, opts);
  } else {
    // For traditional servers, use the standard caching
    // Check if we're in a disconnected state and reset cache
    if (cached.conn && mongoose.connection.readyState === 0) {
      console.log('Traditional: Connection is disconnected, resetting cache');
      cached.conn = null;
      cached.promise = null;
    }

    if (cached.conn) {
      console.log('Traditional: Reusing cached connection');
      return cached.conn;
    }

    if (!cached.promise) {
      console.log('Traditional: Creating new connection');
      cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
        console.log('Traditional: Connected to MongoDB');

        // Monitor connection events
        mongoose.connection.on('connected', () => {
          console.log('Traditional: Mongoose connected to MongoDB');
          logConnectionStats();
        });

        mongoose.connection.on('error', (err) => {
          console.error('Traditional: Mongoose connection error:', err.message);
          // Check for common Atlas IP whitelisting error
          if (err.message && err.message.includes("IP that isn't whitelisted")) {
            console.error('🔒 MongoDB Atlas IP Whitelisting Required:');
            console.error('1. Go to https://cloud.mongodb.com');
            console.error('2. Navigate to Network Access > Add IP Address');
            console.error('3. Add your current IP or use 0.0.0.0/0 for testing (less secure)');
          }
          // Reset cache on connection error
          cached.conn = null;
          cached.promise = null;
        });

        mongoose.connection.on('disconnected', () => {
          console.log('Traditional: Mongoose disconnected from MongoDB');
          // Reset cache on disconnect
          cached.conn = null;
          cached.promise = null;
        });

        // Monitor connection pool
        mongoose.connection.on('reconnected', () => {
          console.log('Traditional: Mongoose reconnected to MongoDB');
          logConnectionStats();
        });

        // Monitor pool events
        mongoose.connection.on('poolCreated', (event) => {
          console.log('Traditional: Connection pool created:', event);
        });

        return mongoose;
      });

      cached.conn = await cached.promise;
      return cached.conn;
    }

    // Wait for existing connection promise
    cached.conn = await cached.promise;
    return cached.conn;
  }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
