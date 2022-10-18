"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, colorize, printf } = winston_1.format;
const options = {
    format: combine((0, winston_1.format)((info) => {
        info.level = info.level.toUpperCase();
        return info;
    })(), colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }), printf(({ timestamp, message, level }) => `[${level}] ${timestamp} : ${message}`)),
    transports: [
        new winston_1.transports.Console({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new winston_1.transports.File({ filename: "debug.log", level: "debug" }),
    ],
};
const logger = (0, winston_1.createLogger)(options);
if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}
exports.default = logger;
