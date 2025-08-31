import { DataTypes } from "sequelize";
import { sequelize } from "../server.js";

const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "visitor" }
});

export default User;
