import express from "express";
import userRouter from "./routes/api/user.routes";
import productRouter from "./routes/api/product.routes";
import authRouter from "./routes/api/auth.routes";
import applicationRouter from "./routes/api/application.routes";
import { AppDataSource } from "./config/ormConfig.ts";
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CORSURL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Allows parsing of json in the body of the request.
app.use(express.json());

app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", authRouter);
app.use("/", applicationRouter)


app.get("/", function (_req, res) {
  return res.send("Database on port 3003, typeORM");
});

// Initialize the MongoDB connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully on port 3003.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

export default app;