import { Request, Response } from "express";
import { AppDataSource } from "../../config/ormConfig.ts";
import { Products } from "../../entities/Product";
import { Users } from "../../entities/User.js";

const productRepository = AppDataSource.getMongoRepository(Products);
const userRepository = AppDataSource.getMongoRepository(Users);

export const getAllProducts = async (_req: Request, res: Response) => {
    // res.json({ message: "Fetching all users..." });
    try {
        const products = await productRepository.find();

        // products.forEach((product) => {
        //     ;
        // });

        // const author = await userRepository.findOne(products[0].author)

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};
