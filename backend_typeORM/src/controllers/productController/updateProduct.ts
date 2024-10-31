import { Request, Response } from "express";
import { updateProductORM } from "../../utils/db/product/updateProductORM";

export const updateProducts = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;
        const body = req.body;

        const updatedProduct = await updateProductORM(slug, body);

        return res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};