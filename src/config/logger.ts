import dayjs from "dayjs";
import winston from "winston";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const timeFormat = "YYYY-MM-DD HH:mm:ss";
const timezoneName = "Asia/Jerusalem";

const customColors = {
  info: "magenta",
  error: "red",
  warn: "yellow",
  debug: "blue",
};

winston.addColors(customColors);

/**
 * Creates a Winston logger instance with the specified configuration.
 * @returns A Winston logger instance.
 */
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => dayjs().tz(timezoneName).format(timeFormat),
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: () => dayjs().tz(timezoneName).format(timeFormat),
        }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ],
});
