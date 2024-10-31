import { Request, Response } from "express";
import { getAllProductsORM } from "../../utils/db/product/getAllProductsORM";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const productList = await getAllProductsORM();

        return res.json(productList);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};