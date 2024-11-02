// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllApplications } from "../../controllers/applicationController/getAllApplications";
import { updateApplications } from "../../controllers/applicationController/updateApplication";
import { acceptApplication } from "../../controllers/applicationController/acceptApplication";
import { discardApplication } from "../../controllers/applicationController/discardApplication";
import { getOneApplication } from "../../controllers/applicationController/getOneApplication";

const router = Router();

router.get("/applications/:username", getAllApplications);
router.get('/application/:slug', getOneApplication);

router.put("/application/:slug_application", updateApplications);
router.put("/application/:slug_application/accept", acceptApplication);
router.put("/application/:slug_application/discard", discardApplication);


export default router;
