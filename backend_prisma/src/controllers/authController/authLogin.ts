import { NextFunction, Request, Response } from "express";
import createUserToken from "../../utils/auth/createUserToken";
import userGetEmailPrisma from "../../utils/db/user/userGetEmailPrisma";
import { compareWithHash } from "../../utils/hashPasswords";
import userViewer from "../../view/userViewer";

/**
 * Users controller for the login function sending a valid jwt token in the response if login is successful.
 * @param req Request with a body property body containing a json with user object with name and email as properties.
 * @param res Response
 */
export default async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body.user;
  try {
    const user = await userGetEmailPrisma(email);
    if (!user) return res.sendStatus(404);

    if (user.userType != "company") {
      return res.json({ message: `User is ${user.userType}, must be a company` });
    }

    const isPasswordMatch = await compareWithHash(password, user.password);

    if (!isPasswordMatch) {
      return res.sendStatus(403);
    } else {
      const token = createUserToken(user);
      const userView = userViewer(user, token);

      return res.json(userView);
    }

  } catch (error) {
    return next(error);
  }
}
