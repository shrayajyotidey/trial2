import { DataTypes } from "sequelize";
import { sequelize } from "../server.js";
import User from "./User.js";

const Vendor = sequelize.define("Vendor", {
  category: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  details: { type: DataTypes.TEXT },
  availability: { type: DataTypes.STRING, defaultValue: "available" },
  offer: { type: DataTypes.STRING }
});

Vendor.belongsTo(User, { foreignKey: "ownerId" });

export default Vendor;
