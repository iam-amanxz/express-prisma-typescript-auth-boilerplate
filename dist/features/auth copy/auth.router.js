"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const _1 = require(".");
const authRouter = (router) => {
    router.post("/sign-up", _1.authController.signUp);
    router.post("/sign-in", _1.authController.signIn);
    router.get("/sign-out", _1.authController.signOut);
    return router;
};
exports.authRouter = authRouter;
