import { Request, Response } from "express";
import { getPendingProductsORM } from "../../utils/db/product/getPendingProductsORM";

export const getPendingProducts = async (req: Request, res: Response) => {
    try {
        const pendingProductList = await getPendingProductsORM();

        return res.json(pendingProductList);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};