import { Router } from "express";
import { userLogin } from "../../controllers/authController/login.controller";
import * as validator from "../../middleware/userValidator";

const router = Router();

router.post("/login", validator.userLoginValidator, userLogin);

export default router;