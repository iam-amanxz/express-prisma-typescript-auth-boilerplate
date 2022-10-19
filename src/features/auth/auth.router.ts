import { Router } from "express";
import { container } from "tsyringe";
import { checkSchema } from "express-validator";
import { isAuthenticated } from "../../middleware";
import { AuthController, authSchema } from ".";

export const authRouter = (router: Router) => {
  const controller = container.resolve(AuthController);

  router.post("/sign-up", checkSchema(authSchema.signUp), controller.signUp);
  router.post("/sign-in", checkSchema(authSchema.signIn), controller.signIn);
  router.get("/sign-out", controller.signOut);
  router.get("/me", isAuthenticated, controller.getMe);

  return router;
};
