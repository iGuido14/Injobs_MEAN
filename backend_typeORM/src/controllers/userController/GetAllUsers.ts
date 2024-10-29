import { Request, Response } from "express";
import { AppDataSource } from "../../config/ormConfig.ts";
import { Users } from "../../entities/User";

const userRepository = AppDataSource.getMongoRepository(Users);

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userRepository.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};
