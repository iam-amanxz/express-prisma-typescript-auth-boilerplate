import express from "express";
import { authRouter } from "./features/auth";

const createRouter = () => {
  const router = express.Router();

  router.use("/auth", authRouter(router))

  router.get("/", (_, res) => {
    res.json({ message: "success" });
  });

  return router;
};

export default createRouter;
