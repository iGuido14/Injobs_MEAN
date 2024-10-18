import { Router } from "express";
import { usersLogin } from "../../controllers/authController";
import * as validator from "../../middleware/userValidator";

const router = Router();

router.post("/login", validator.userLoginValidator, usersLogin);
// router.get("/login", usersLogin);

export default router;