// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllUsers } from "../../controllers/userController/GetAllUsers";
import { getOneUser } from "../../controllers/userController/getOneUser";
import { updateUser } from "../../controllers/userController/updateUser";
import { authenticate } from "../../middleware/auth/authenticator";

const router = Router();

router.get("/users", getAllUsers);
router.get("/user/:email", authenticate, getOneUser);

router.put("/user/:username", authenticate, updateUser);

export default router;