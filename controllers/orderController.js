import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//Placing order using cash on delivery
const placeOrder = async (req, res) => {
  try {
    const { userId, orderItems, amount, address, paymentMethod } = req.body;

    // Validate that orderItems is not empty
    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items in the order." });
    }

    // Create order data
    const orderData = {
      userId,
      items: orderItems,
      address,
      amount,
      paymentMethod: paymentMethod || "COD",
      payment: paymentMethod !== "COD", // If COD, payment is false
      date: Date.now(),
    };

    // Save order
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear the cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.json({ success: true, message: "Order Placed", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//All orders data for admin pannel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: error.message });
  }
};

// UserOrder data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status, amount } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status }, amount);

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get the total count of orders
const getOrderCount = async (req, res) => {
  try {
    const orderCount = await orderModel.countDocuments();

    // console.log("Order Count: ", orderCount);

    res.json({ success: true, orderCount });
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, allOrders, userOrders, updateStatus, getOrderCount };
