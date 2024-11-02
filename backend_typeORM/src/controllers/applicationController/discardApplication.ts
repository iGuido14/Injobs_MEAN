import { Request, Response } from "express";
import { updateApplicationORM } from "../../utils/db/application/updateApplicationORM";

export const discardApplication = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug_application;
        const body = req.body;

        const updatedApplication = await updateApplicationORM(slug, body);

        return res.json(updatedApplication);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};