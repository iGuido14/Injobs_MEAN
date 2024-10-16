import { Router } from "express";
import { userGet, userUpdate } from "../../controllers/userController";
import { authenticate } from "../../middleware/auth/authenticator";
import { userUpdateValidator } from "../../middleware/userValidator";
import userGetAll from "../../controllers/userController/userGetAll";

const router = Router();

router.get("/", userGetAll);

router.get("/:username", authenticate, userGet);

router.put("/", authenticate, userUpdateValidator, userUpdate);

export default router;