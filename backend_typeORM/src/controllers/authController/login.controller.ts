import { NextFunction, Request, Response } from "express";
import createUserToken from "../../utils/auth/createUserToken";
import { getOneUserORM } from "../../utils/db/user/getOneUserORM";
import { compareWithHash } from "../../utils/hashPasswords";
import { userViewer } from "../../view/user.view";

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body.user;

    try {
        const user = await getOneUserORM(email);
        if (!user) return res.sendStatus(404);

        if (user.userType != "recruiter") {
            return res.json({ message: `User is ${user.userType}, must be a recruiter` });
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