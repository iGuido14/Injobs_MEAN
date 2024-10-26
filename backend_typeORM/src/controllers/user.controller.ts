// controllers/userController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = userRepository.create({ name, email, password });
    await userRepository.save(user);
    res.json(user);
};

// Otros métodos como `getUsers`, `updateUser`, `deleteUser`, etc. pueden agregarse aquí.
