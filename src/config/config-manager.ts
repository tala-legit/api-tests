import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

/**
 * Throws an error if a required environment variable is missing.
 * @param variable - The name of the missing variable.
 */
const throwMissing = (variable: string): never => {
  throw new Error(
    `Environment variable "${variable}" is required but not set. Please ensure it is defined in your .env file or the environment.`
  );
};

/**
 * Configuration manager to centralize environment variables.
 * Dynamic properties fora other environment variables
 */

interface ConfigManager {
  url: string;
  apiJwt: string;
  pageSize: number | string;
  [key: string]: string | number;
}

/**
 * Load and validate the configuration at module initialization.
 */
export const configManager: ConfigManager = {
  // Enforced variables
  url: process.env.BASE_URL || throwMissing("BASE_URL"),
  apiJwt: process.env.API_JWT || throwMissing("API_JWT"),
  pageSize: process.env.PAGE_SIZE || 50,
  // All other variables
  ...process.env,
};
