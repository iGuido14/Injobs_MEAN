// index.ts
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(() => {
        console.error("Error during Data Source initialization:");
    });
