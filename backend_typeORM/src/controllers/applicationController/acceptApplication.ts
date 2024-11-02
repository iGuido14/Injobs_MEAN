import { Request, Response } from "express";
import { updateApplicationORM } from "../../utils/db/application/updateApplicationORM";
import { updateProductORM } from "../../utils/db/product/updateProductORM";
import { getOneApplicationsORM } from "../../utils/db/application/getOneApplicationORM";
import { updateUserORM } from "../../utils/db/user/updateUserORM";

export const acceptApplication = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug_application;
        const accept = {
            status: "closed",
            isUserAccepted: true,
        }
        await updateApplicationORM(slug, accept);

        const applicationInfo = await getOneApplicationsORM(slug);
        const jobSlug = applicationInfo[0].product?.slug;
        const bodyJob = {
            isClosed: true
        }
        await updateProductORM(jobSlug, bodyJob);

        const username = applicationInfo[0].user?.username;
        const bodyUser = {
            isWorking: true
        }
        await updateUserORM(username, bodyUser);

        return res.json({ message: "Application accepted." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};