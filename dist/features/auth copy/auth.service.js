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
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const _1 = require("../../.");
const logger_1 = __importDefault(require("../../logger"));
exports.authService = {
    signUp: (dto) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = dto;
        // check if email exists already (throw if yes)
        const emailExists = yield _1.prisma.user.findFirst({ where: { email } });
        if (emailExists) {
            logger_1.default.error("Username already exists");
            throw new Error("Username already exists");
        }
        // hash password
        let salt;
        let hash;
        // 1. generate salt
        try {
            salt = bcryptjs_1.default.genSaltSync(10);
            logger_1.default.debug("Salt generated: " + salt);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw error;
        }
        // 2. hash = password + salt
        try {
            hash = bcryptjs_1.default.hashSync(password, salt);
            logger_1.default.debug("Hash generated: " + hash);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw error;
        }
        // save user
        const newUser = yield _1.prisma.user.create({ data: { email, hash, salt } });
        logger_1.default.debug("New user created: " + newUser.email);
        return newUser;
    }),
    signIn: (dto) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = dto;
        // check user exists
        const existingUser = yield _1.prisma.user.findFirst({ where: { email } });
        if (!existingUser) {
            logger_1.default.error("Invalid credentials");
            throw new Error("Invalid credentials");
        }
        // validate password
        // 1. fetch salt and hash
        const { hash, salt } = existingUser;
        // 2. hash user entered password with salt
        let newHash;
        try {
            newHash = bcryptjs_1.default.hashSync(password, salt);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw error;
        }
        // 3. verify new hash === hash
        if (hash !== newHash) {
            throw new Error("Invalid credentials");
        }
        return existingUser;
    }),
    signOut: () => { },
};
