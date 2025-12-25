// lib/database.ts - Database operations wrapper with connection pooling
import dbConnect, { logConnectionStats } from './mongodb';

export interface DatabaseOperation<T> {
  (): Promise<T>;
}

export interface DatabaseOptions {
  logStats?: boolean;
  retryCount?: number;
  timeout?: number;
}

/**
 * Execute a database operation with proper connection pooling and error handling
 */
export async function executeDatabaseOperation<T>(
  operation: DatabaseOperation<T>,
  options: DatabaseOptions = {}
): Promise<T> {
  const { logStats = false, retryCount = 1, timeout = 30000 } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      // Ensure we have a valid connection
      await dbConnect();

      // Log connection stats if requested
      if (logStats) {
        logConnectionStats();
      }

      // Set a timeout for the operation
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Database operation timeout')), timeout);
      });

      // Execute the operation with timeout
      const result = await Promise.race([operation(), timeoutPromise]);

      return result;

    } catch (error) {
      lastError = error as Error;
      console.error(`Database operation failed (attempt ${attempt}/${retryCount}):`, error);

      // If this isn't the last attempt, wait before retrying
      if (attempt < retryCount) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // If we get here, all retries failed
  throw new Error(`Database operation failed after ${retryCount} attempts: ${lastError?.message}`);
}

/**
 * Wrapper for GET operations
 */
export async function dbGet<T>(
  operation: DatabaseOperation<T>,
  options: DatabaseOptions = {}
): Promise<T> {
  return executeDatabaseOperation(operation, { ...options, logStats: false });
}

/**
 * Wrapper for POST/PUT/DELETE operations
 */
export async function dbMutate<T>(
  operation: DatabaseOperation<T>,
  options: DatabaseOptions = { retryCount: 2 }
): Promise<T> {
  return executeDatabaseOperation(operation, options);
}

/**
 * Wrapper for bulk operations
 */
export async function dbBulk<T>(
  operation: DatabaseOperation<T>,
  options: DatabaseOptions = { retryCount: 1, timeout: 60000 }
): Promise<T> {
  return executeDatabaseOperation(operation, options);
}