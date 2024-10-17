import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
// import userViewer from "../../view/userViewer";
import productGetAllPrisma from "../../utils/db/product/productGetAllPrisma";

/**
 * User controller that gets the current user based on the JWT given.
 * @param req Request with an authenticated user on the auth property.
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function productGetAll(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // Get current user
        const allUsers = await productGetAllPrisma();

        return res.json(allUsers);
    } catch (error) {
        return next(error);
    }
}
