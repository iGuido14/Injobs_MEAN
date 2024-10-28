import { Request, Response } from "express";
import { AppDataSource } from "../../config/ormConfig.ts";
import { User } from "../../entities/User";

const userRepository = AppDataSource.getMongoRepository(User);

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userRepository.find(); // Fetches all users from the User collection
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};
