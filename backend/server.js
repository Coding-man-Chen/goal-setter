import express from "express";
import dotenv from "dotenv";
import goalRouter from "./routes/goalRoutes.js";
import userRouter from './routes/userRoutes.js'
import errorHandler from "./middlewares/errorHanlderMiddleware.js";
import colors from "colors";
import {connectDB} from "./config/db.js"

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);
app.use("/api/users",userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
