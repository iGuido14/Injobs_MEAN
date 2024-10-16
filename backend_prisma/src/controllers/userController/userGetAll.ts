import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import userViewer from "../../view/userViewer";
import userGetAllPrisma from "../../utils/db/user/userGetAllPrisma";

/**
 * User controller that gets the current user based on the JWT given.
 * @param req Request with an authenticated user on the auth property.
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function userGetAll(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // Get current user
        const allUsers = await userGetAllPrisma();

        return res.json(allUsers);
    } catch (error) {
        return next(error);
    }
}
