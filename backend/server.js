import express from "express";
import dotenv from "dotenv";
import goalRouter from "./routes/goalRoutes.js";
import userRouter from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHanlderMiddleware.js";
import colors from "colors";
import path from 'path'
import { connectDB } from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();
const __dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
