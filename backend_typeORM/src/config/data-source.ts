// data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
// import { Product } from "./entities/Product";
// import { Application } from "./entities/Application"

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGODB_URI,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [User],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
