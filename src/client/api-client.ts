import axios from "axios";
import { configManager, logger, TIMEOUTS } from "../config";

/**
 * Create a pre configured axios instance.
 * - Base URL and JWT are taken from our configManager
 */
export const apiClient = axios.create({
  baseURL: `${configManager.url}/api/v1.0`,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${configManager.apiJwt}`,
  },
  timeout: TIMEOUTS.API,
});

/**
 * Request interceptor for logging and debugging.
 */
apiClient.interceptors.request.use(
  (request) => {
    logger.info(`[REQUEST] ${request.method?.toUpperCase()} → ${request.url}`);
    return request;
  },
  (error) => {
    logger.error(`[REQUEST ERROR] ${error.message}`);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for logging and debugging.
 */
apiClient.interceptors.response.use(
  (response) => {
    logger.info(`[RESPONSE] ${response.status} ← ${response.config?.url}`);
    return response;
  },
  (error) => {
    logger.error(`[RESPONSE ERROR] ${error.message}`);
    return Promise.reject(error);
  }
);
