import { Request, Response } from "express";
import { getOneProductORM } from "../../utils/db/product/getOneProductORM";
import { productViewer } from "../../view/product.view";

export const getOneProduct = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;

        const product = await getOneProductORM(slug);

        const productSerialized = await productViewer(product);

        return res.json(productSerialized);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};