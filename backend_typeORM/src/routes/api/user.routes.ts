// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllUsers } from "../../controllers/userController/userGetAll";

const router = Router();

router.get("/users", getAllUsers);

export default router;
