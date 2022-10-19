import express from "express";
import { authRouter } from "./features/auth";

const createRouter = () => {
  const router = express.Router();

  router.use("/auth", authRouter(router));

  return router;
};

export default createRouter;
