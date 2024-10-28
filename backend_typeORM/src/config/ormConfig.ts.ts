import { DataSource } from "typeorm";
import { User } from "../entities/User";
// import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URI || "mongodb://localhost:27017/your_database",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true, // Sync entities with MongoDB
    logging: true,
    entities: [User], // Add your entities here
});
