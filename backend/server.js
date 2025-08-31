import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Sequelize } from "sequelize";
import authRoutes from "./routes/auth.js";
import vendorRoutes from "./routes/vendor.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ SQL Database connected"))
  .catch(err => console.error("❌ DB error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/vendors", vendorRoutes);

app.get("/", (req, res) => res.send("Backend with SQL running ✅"));

// Start
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
