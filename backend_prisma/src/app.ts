import express from "express";
import userRouter from "./routes/api/user.routes";
import productRouter from "./routes/api/product.routes";
import authRouter from "./routes/api/auth.routes";
import generalErrorHandler from "./middleware/errorHandling/generalErrorHandler";
import { authErrorHandler, prismaErrorHandler } from "./middleware/errorHandling";
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


app.get("/", function (_req, res) {
  return res.send("This is just the backend for RealWorld");
});

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;
