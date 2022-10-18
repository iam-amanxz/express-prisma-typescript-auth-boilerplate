import { createLogger, format, transports, LoggerOptions } from "winston";

const { combine, timestamp, colorize, printf } = format;

const options: LoggerOptions = {
  format: combine(
    format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    printf(({ timestamp, message, level }) => `[${level}] ${timestamp} : ${message}`)
  ),
  transports: [
    new transports.Console({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
    new transports.File({ filename: "debug.log", level: "debug" }),
  ],
};

const logger = createLogger(options);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
