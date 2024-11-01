import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createUserToken from "../../utils/auth/createUserToken";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import userViewer from "../../view/userViewer";


export default async function userGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.params.username;
  try {
    // Get current user
    const currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(404);

    // const token = createUserToken(currentUser);
    // const token = "hola";

    const response = userViewer(currentUser);

    return res.json(response);
  } catch (error) {
    return next(error);
  }
}
