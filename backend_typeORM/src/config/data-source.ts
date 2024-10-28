// data-source.ts
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Application } from "../entities/Application";
import { Comment } from "../entities/Comment";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGODB_URI,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [User, Product, Application, Comment],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
