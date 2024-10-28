// src/routes/user.routes.ts

import { Router } from "express";
import getAllUsers from "../controllers/User/userGetAll"; // Adjust the import path as necessary

const router = Router();

// Route to get all users
router.get("/", getAllUsers);

export default router;