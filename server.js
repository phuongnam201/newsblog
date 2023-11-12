import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import cors from "cors";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler";

//routes
import userRoutes from "./routes/userRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
