import { Request, Response } from "express";
import { updateProductORM } from "../../utils/db/product/updateProductORM";
import { updateUserORM } from "../../utils/db/user/updateUserORM";

export const updateUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const body = req.body;

        const updatedProduct = await updateUserORM(username, body);

        return res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};