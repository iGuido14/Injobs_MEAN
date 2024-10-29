import { Request, Response } from "express";
import { getAllProductsORM } from "../../utils/db/product/getAllProductsORM";

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const allUsers = await getAllProductsORM();

        return res.json(allUsers);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};