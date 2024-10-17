import express from "express";
import userRouter from "./routes/api/user.routes";
import generalErrorHandler from "./middleware/errorHandling/generalErrorHandler";
import { authErrorHandler, prismaErrorHandler } from "./middleware/errorHandling";

const app = express();

// Allows parsing of json in the body of the request.
app.use(express.json());

app.use("/", userRouter);


app.get("/", function (_req, res) {
  return res.send("This is just the backend for RealWorld");
});

app.use(authErrorHandler, prismaErrorHandler, generalErrorHandler);

export default app;
