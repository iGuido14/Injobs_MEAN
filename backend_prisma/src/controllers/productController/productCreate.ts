import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
// import articleCreatePrisma from "../../utils/db/article/articleCreatePrisma";
// import tagsCreatePrisma from "../../utils/db/tag/tagsCreatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
// import articleViewer from "../../view/articleViewer";
import createProduct from "../../utils/db/product/productCreatePrisma";

interface Product {
    description: string;
    id_cat: string;
    images?: string[];
    img?: string;
    name: string;
    price: number;
}

/**
 * Article controller that must receive a request with an authenticated user.
 * The body of the request must have the article object that is an @interface Article.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function productCreate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return res.json("hola");

    // const { name, description, id_cat, price, images, img }: Product = req.body.article;
    // const userName = req.params.username;

    // try {
    //     // Get current user
    //     const currentUser = await userGetPrisma(userName);
    //     if (!currentUser) return res.sendStatus(401);

    //     // Create the article
    //     const newProduct = await createProduct(
    //         { name, description, id_cat, price, images, img },
    //         currentUser.username
    //     );

    //     // Create article view
    //     // const articleView = articleViewer(article, currentUser);
    //     return res.status(201).json({ newProduct });
    // } catch (error) {
    //     return next(error);
    // }
}
