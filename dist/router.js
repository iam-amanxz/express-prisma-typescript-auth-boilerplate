"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./features/auth");
const createRouter = () => {
    const router = express_1.default.Router();
    router.use("/auth", (0, auth_1.authRouter)(router));
    router.get("/", (_, res) => {
        res.json({ message: "success" });
    });
    return router;
};
exports.default = createRouter;
