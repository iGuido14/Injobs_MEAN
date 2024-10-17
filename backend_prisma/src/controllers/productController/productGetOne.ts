import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
// import userViewer from "../../view/userViewer";
import productGetAllPrisma from "../../utils/db/product/productGetAllPrisma";
import productGetPrisma from "../../utils/db/product/productGetPrisma";

/**
 * User controller that gets the current user based on the JWT given.
 * @param req Request with an authenticated user on the auth property.
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function productGetOne(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const slug = req.params.slug;
    // return res.json(slug);

    try {
        // Get current user
        const oneUser = await productGetPrisma(slug);

        return res.json(oneUser);
    } catch (error) {
        return next(error);
    }
}
