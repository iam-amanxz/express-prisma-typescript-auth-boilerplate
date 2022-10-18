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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const _1 = require(".");
exports.authController = {
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // validate username and password
        const { username, password } = req.body;
        // convert username to email
        const email = username + "@mydomain.com";
        const user = yield _1.authService.signUp({ email, password });
        // generate and save session
        const session = req.session;
        // @ts-ignore
        session.email = email;
        // return response
        res.status(201).json({ user, session: req.session });
    }),
    signIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // validate username and password
        const { username, password } = req.body;
        const email = username + "@mydomain.com";
        const user = yield _1.authService.signIn({ email, password });
        // generate and save session
        const session = req.session;
        // @ts-ignore
        session.email = email;
        // return response
        res.status(200).json({ user, session: req.session });
    }),
    signOut: (req, res) => {
        req.session.destroy((error) => { });
    },
};
