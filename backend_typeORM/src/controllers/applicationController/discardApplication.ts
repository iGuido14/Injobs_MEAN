import { Request, Response } from "express";
import { updateApplicationORM } from "../../utils/db/application/updateApplicationORM";

export const discardApplication = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug_application;
        const accept = {
            status: "discarded",
            isUserAccepted: false,
        }
        await updateApplicationORM(slug, accept);

        return res.json({ message: "Application discarded." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};