// src/routes/api/user.routes.ts
import { Router } from "express";
import { getAllUsers } from "../../controllers/userController/GetAllUsers";
import { getOneUser } from "../../controllers/userController/getOneUser";

const router = Router();

router.get("/users", getAllUsers);

router.get("/user/:email", getOneUser);

export default router;
