import { Request, Response } from "express";
import { getAllApplicationsORM } from "../../utils/db/application/getAllApplicationsORM";

export const getAllApplications = async (req: Request, res: Response) => {
    try {
        const applicationList = await getAllApplicationsORM();

        return res.json(applicationList);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};