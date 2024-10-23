import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
// import userViewer from "../../view/userViewer";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import productGetPrismaAuthor from "../../utils/db/product/productGetPrismaAuthor";

/**
 * User controller that gets the current user based on the JWT given.
 * @param req Request with an authenticated user on the auth property.
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function getProductsAuthor(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const username = req.params.username;
    // return res.json(slug);

    try {
        // Get current user
        const currentUser = await userGetPrisma(username);
        if (!currentUser) return res.sendStatus(404);

        const productAuthor = await productGetPrismaAuthor(currentUser.id);

        return res.json(productAuthor);
    } catch (error) {
        return next(error);
    }
}
