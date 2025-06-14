import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order.model";
import Cart from "../models/Cart.model";
import razorpay from "../config/Razorpay";
import crypto from "crypto";
interface AuthRequest extends Request {
  user_info?: { _id: string };
}

// ------------------------------
// COD Order Creation
// ------------------------------
const createOrderCOD = async (req: AuthRequest, res: Response) => {
  try {
    const { name, address, pincode, phone, paymentMode } = req.body;

    if (!req.user_info) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const groupedCart = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user_info._id) } },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.seller",
          items: {
            $push: {
              product: "$productDetails._id",
              name: "$productDetails.name",
              image: { $arrayElemAt: ["$productDetails.images", 0] },
              size: "$size",
              color: "$color",
              amount: "$amount",
              productcount: "$productcount",
              seller: "$productDetails.seller"
            },
          },
        },
      },
    ]);

    if (!groupedCart.length) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    const createdOrders = [];

    for (const group of groupedCart) {
      let subtotal = 0;
      for (const item of group.items) {
        subtotal += item.amount * item.productcount;
      }

      const deliveryfee = 40;
      const offer = 0;
      const totalAmount = subtotal + deliveryfee - offer;

      const order = await Order.create({
        name,
        address,
        pincode,
        phone,
        user: req.user_info._id,
        seller: group._id,
        items: group.items,
        paymentMode,
        Orderstatus: "Pending",
        paymentStatus: "pending",
        subtotal,
        totalAmount,
      });

      createdOrders.push(order);
    }

    await Cart.deleteMany({ user: req.user_info._id });

    res.status(201).json({
      success: true,
      message: "Orders placed successfully",
      orders: createdOrders,
    });
    return;
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// ------------------------------
// Razorpay Order Creation
// ------------------------------
const createOrderRazorpay = async (req: AuthRequest, res: Response) => {
  try {
    const { name, address, pincode, phone, paymentMode } = req.body;

    if (!req.user_info) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const groupedCart = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user_info._id) } },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.seller",
          items: {
            $push: {
              product: "$productDetails._id",
              name: "$productDetails.name",
              image: { $arrayElemAt: ["$productDetails.images", 0] },
              size: "$size",
              color: "$color",
              amount: "$amount",
              productcount: "$productcount",
              seller: "$productDetails.seller"
            },
          },
        },
      },
    ]);

    if (!groupedCart.length) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    let totalAmount = 0;
    for (const group of groupedCart) {
      for (const item of group.items) {
        totalAmount += item.amount * item.productcount;
      }
    }

    const razorpayorder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { userId: req.user_info._id.toString() },
    });
    console.log(razorpayorder);
    

    const createdOrders = [];

    for (const group of groupedCart) {
      let subtotal = 0;
      for (const item of group.items) {
        subtotal += item.amount * item.productcount;
      }

      const deliveryfee = 40;
      const offer = 0;
      const totalAmountPerGroup = subtotal + deliveryfee - offer;

      const order = await Order.create({
        name,
        address,
        pincode,
        phone,
        user: req.user_info._id,
        seller: group._id,
        items: group.items,
        paymentMode,
        razorpayOrderId: razorpayorder.id,
        Orderstatus: "Pending",
        paymentStatus: "pending",
        subtotal,
        totalAmount: totalAmountPerGroup,
      });

      createdOrders.push(order);
    }

    await Cart.deleteMany({ user: req.user_info._id });

    res.status(201).json({
  message: "Orders placed successfully",
  orders: createdOrders,
  razorpayOrder: {
    ...razorpayorder,
    key_id: process.env.RAZORPAY_KEY_ID, // ✅ Add this
  },
});
    
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// ------------------------------
// Cart Total
// ------------------------------
const getCartTotalAmount = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user_info?._id) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const cartItems = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user_info._id) } },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: { $multiply: ["$productcount", "$productDetails.price"] },
          },
        },
      },
    ]);

    const total = cartItems[0]?.totalAmount ?? 0;

    res.status(200).json({
      success: true,
      totalAmount: total,
      offer: 0,
      deliveryfee: 40,
    });
    return;
  } catch (error) {
    console.error("Error fetching cart total:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
const verifyRazorpayPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
       res.status(400).json({ success: false, message: "Payment verification failed" });
       return
    }

    // Update order(s) with payment success
    await Order.updateMany(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          paymentStatus: "success",
          Orderstatus: "Confirmed",
          razorpayPaymentId: razorpay_payment_id,
        },
      }
    );

     res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (err) {
    console.error("Verification Error:", err);
     res.status(500).json({ success: false, message: "Internal server error" });
     
  }
};
export {
  createOrderCOD,
  createOrderRazorpay,
  getCartTotalAmount,
  verifyRazorpayPayment ,
};
