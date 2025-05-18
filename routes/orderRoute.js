import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  getOrderCount,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post("/place", authUser, placeOrder);

//User feature
orderRouter.post("/userorders", authUser, userOrders);

// Get the total count of orders

orderRouter.get("/order-count", getOrderCount); // Admin authentication required

export default orderRouter;
