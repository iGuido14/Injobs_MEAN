import express from "express";
import userRouter from "./routes/api/user.routes";
import productRouter from "./routes/api/product.routes";
import authRouter from "./routes/api/auth.routes";
// import generalErrorHandler from "./middleware/errorHandling/generalErrorHandler";
// import { authErrorHandler } from "./middleware/errorHandling";
import { AppDataSource } from "./config/ormConfig.ts";

const app = express();

// Allows parsing of json in the body of the request.
app.use(express.json());

app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", authRouter);


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