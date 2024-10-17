import { Router } from "express";
import { userGet, userUpdate } from "../../controllers/userController";
import { authenticate } from "../../middleware/auth/authenticator";
import { userUpdateValidator } from "../../middleware/userValidator";
import userGetAll from "../../controllers/userController/userGetAll";

const router = Router();

router.get("/users", userGetAll);

// router.get("/user/:username", authenticate, userGet);
router.get("/user/:username", userGet);

router.put("/user/:username", authenticate, userUpdateValidator, userUpdate);

export default router;