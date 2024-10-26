import { NextFunction, Request, Response } from "express";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
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
 * Users controller for the login function sending a valid jwt token in the response if login is successful.
 * @param req Request with a body property body containing a json with user object with name and email as properties.
 * @param res Response
 */

export default async function productCreate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // return res.json(req.params);

    const { name, description, id_cat, price, images, img }: Product = req.body.product;
    const userName = req.params.username;

    // return res.json(req.body);

    try {
        // Get current user
        const currentUser = await userGetPrisma(userName);
        if (!currentUser) return res.sendStatus(401);

        // Create the article
        const newProduct = await createProduct(
            { name, description, id_cat, price, images, img },
            currentUser.id
        );

        // return res.json(newProduct);

        // Create article view
        // const articleView = articleViewer(article, currentUser);
        return res.status(201).json(newProduct);
    } catch (error) {
        return next(error);
    }
}
