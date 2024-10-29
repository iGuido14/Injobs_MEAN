// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllApplications } from "../../controllers/applicationController/getAllApplications";
import { updateApplications } from "../../controllers/applicationController/updateApplication";

const router = Router();

router.get("/applications", getAllApplications);

router.put("/application/:slug_application", updateApplications);

export default router;
