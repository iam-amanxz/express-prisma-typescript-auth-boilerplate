"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connectRedis = __importStar(require("connect-redis"));
const logger_1 = __importDefault(require("./logger"));
const router_1 = __importDefault(require("./router"));
const client_1 = require("@prisma/client");
const middleware_1 = require("./middleware");
exports.prisma = new client_1.PrismaClient();
const SERVER_PORT = 5000;
const RedisStore = connectRedis.default(express_session_1.default);
const sessionOptions = {
    resave: false,
    saveUninitialized: false,
    secret: "SESSION_SECRET",
    cookie: {
        maxAge: 1209600000,
        sameSite: false,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
    },
    store: new RedisStore({
        client: new ioredis_1.default(),
    }),
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const router = (0, router_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, express_session_1.default)(sessionOptions));
    app.use((0, morgan_1.default)("combined"));
    app.use(middleware_1.deserializeUser);
    app.use("/api/v1", router);
    yield app.listen(SERVER_PORT);
});
main().then(() => {
    logger_1.default.debug(`Server is up at http://localhost:${SERVER_PORT}`);
});
