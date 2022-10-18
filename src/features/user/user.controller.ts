import { Request, Response } from "express";
// import { authService as service } from ".";
import logger from "../../logger";

export const userController = {
  // signUp: async (req: Request, res: Response) => {
  //   // validate username and password
  //   const { username, password } = req.body;

  //   // convert username to email
  //   const email = username + "@mydomain.com";

  //   const user = await service.signUp({ email, password });

  //   // generate and save session
  //   const session = req.session;
  //   // @ts-ignore
  //   session.email = email;

  //   // return response
  //   res.status(201).json({ user, session: req.session });
  // },
  // signIn: async (req: Request, res: Response) => {
  //   // validate username and password
  //   const { username, password } = req.body;

  //   const email = username + "@mydomain.com";
  //   const user = await service.signIn({ email, password });

  //   // generate and save session
  //   const session = req.session;
  //   // @ts-ignore
  //   session.email = email;

  //   // return response
  //   res.status(200).json({ user, session: req.session });
  // },
  // signOut: (req: Request, res: Response) => {
  //   req.session.destroy((error) => {});
  // },
};
