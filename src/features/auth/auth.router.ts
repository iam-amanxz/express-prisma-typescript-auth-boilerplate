import { Router } from "express";
import { authController as controller } from ".";
import { isAuthenticated } from "../../middleware";

export const authRouter = (router: Router) => {
  router.post("/sign-up", controller.signUp);
  router.post("/sign-in", controller.signIn);
  router.get("/sign-out", controller.signOut);
  router.get("/me", isAuthenticated, controller.getMe);

  return router;
};
