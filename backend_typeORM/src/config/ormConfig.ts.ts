import { DataSource } from "typeorm";
import { Users } from "../entities/User";
import { Products } from "../entities/Product";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URI || "mongodb://localhost:27017/infojobs",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // synchronize: true, // Sync entities with MongoDB
    logging: true,
    entities: [Users, Products], // Add your entities here
});
