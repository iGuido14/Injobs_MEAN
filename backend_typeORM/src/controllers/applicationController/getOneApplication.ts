import { Request, Response } from "express";
import { getAllApplicationsORM } from "../../utils/db/application/getAllApplicationsORM";
import { getOneApplicationsORM } from "../../utils/db/application/getOneApplicationORM";

export const getOneApplication = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const application = await getOneApplicationsORM(slug);

        return res.json(application);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};