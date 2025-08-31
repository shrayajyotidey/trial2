import express from "express";
import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor.js";
import User from "../models/User.js";

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
}

router.post("/", auth, async (req, res) => {
  try {
    const vendor = await Vendor.create({ ...req.body, ownerId: req.userId });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/", async (req, res) => {
  const vendors = await Vendor.findAll({ include: User });
  res.json(vendors);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ msg: "Not found" });
    if (vendor.ownerId !== req.userId) return res.status(403).json({ msg: "Not your vendor" });

    await vendor.destroy();
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
