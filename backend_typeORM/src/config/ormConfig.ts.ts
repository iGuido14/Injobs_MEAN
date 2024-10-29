import { DataSource } from "typeorm";
import { Users } from "../entities/User";
import { Products } from "../entities/Product";
import { Applications } from "../entities/Application";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb://localhost:27017/infojobs",
    useUnifiedTopology: true,
    entities: [Users, Products, Applications],
});
