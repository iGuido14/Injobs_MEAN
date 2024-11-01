import { Request, Response } from "express";
import { getOneProductORM } from "../../utils/db/product/getOneProductORM";
import { userViewer } from "../../view/user.view";
import { getOneUserORM } from "../../utils/db/user/getOneUserORM";

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;

        const user = await getOneUserORM(username);

        const userSerialized = userViewer(user);

        return res.json(userSerialized);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};