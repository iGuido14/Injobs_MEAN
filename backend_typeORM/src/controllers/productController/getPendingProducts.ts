import { Request, Response } from "express";
import { getPendingProductsORM } from "../../utils/db/product/getPendingProductsORM";

export const getPendingProducts = async (req: Request, res: Response) => {
    try {
        const productList = await getPendingProductsORM();

        return res.json(productList);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};