// src/index.ts
import express from "express";
import "reflect-metadata"; // Required for TypeORM decorators
import { AppDataSource } from "./config/data-source"; // Ensure this connects to your SQL database
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware to parse JSON requests
app.use(express.json());

// Use user routes, prefixed by /api/users
app.use("/api/users", userRoutes);

// Initialize the data source
AppDataSource.initialize()
    .then(() => {
        console.log("Connected to the database");

        // Start the server after successful connection
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error);
    });
