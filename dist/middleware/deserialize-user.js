"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = void 0;
const user_1 = require("../features/user");
const logger_1 = __importDefault(require("../logger"));
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if no session continue
    if (!req.session) {
        logger_1.default.debug("No session found");
        return next();
    }
    logger_1.default.debug("Session found, deserializing user");
    // if session fetch user and attach to the request
    //   @ts-ignore
    const user = yield user_1.userService.getUserByEmail(req.session.email);
    //   @ts-ignore
    req.user = user;
    return next();
});
exports.deserializeUser = deserializeUser;
