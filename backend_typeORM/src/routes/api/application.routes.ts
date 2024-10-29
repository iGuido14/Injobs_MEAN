// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllApplications } from "../../controllers/applicationController/getAllApplications";

const router = Router();

router.get("/applications", getAllApplications);

export default router;
