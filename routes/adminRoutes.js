import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

const adminrouter = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default adminrouter;
