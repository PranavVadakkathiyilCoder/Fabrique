import { Request, Response } from "express";
import mongoose from "mongoose";
import Order, { IOrder } from "../models/Order.model";
import Cart from "../models/Cart.model";
import razorpay from "../config/Razorpay";
import crypto from "crypto";
import Coupon from "../models/Coupon.model";
import nodemailer from "nodemailer";
import { sendOrderConfirmationEmail } from "../config/Nodemailer";
interface AuthRequest extends Request {
  user_info?: { _id: string; email: string };
}

const createOrderCOD = async (req: AuthRequest, res: Response) => {
  try {
    const { name, address, pincode, phone, paymentMode, offerId } = req.body;

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
              seller: "$productDetails.seller",
            },
          },
        },
      },
    ]);

    console.log("gcart", groupedCart);

    if (!groupedCart.length) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    const createdOrders = [];

    for (const group of groupedCart) {
      let subtotal = 0;
      for (const item of group.items) {
        subtotal += item.amount;
      }

      const deliveryFee = 40;
      let discountValue = 0;
      let constdiscount;
      if (offerId) {
        const coupon = await Coupon.findById(offerId);
        if (coupon) {
          discountValue = Math.round((subtotal * coupon.offer) / 100);
          constdiscount = coupon.offer;
          coupon.usageCount += 1;
          coupon.usedBy.push(req.user_info._id);
          await coupon.save();
        }
      }

      const totalAmount = subtotal + deliveryFee - discountValue;

      //const discountPercent = Math.round(
      //  ((subtotal - paidAmountWithoutDelivery) / subtotal) * 100
      //);

      const order = await Order.create({
        name,
        address,
        pincode,
        phone,
        user: req.user_info._id,
        items: group.items.map((item: any) => ({
          ...item,
          paymentMode,
          Orderstatus: "Pending",
          paymentStatus: "pending",
        })),
        subtotal,
        deliveryFee,
        discount: constdiscount,
        totalAmount,
      });

      createdOrders.push(order);
    }

    await Cart.deleteMany({ user: req.user_info._id });
    const allItems = createdOrders.flatMap((order) => order.items);

    await sendOrderConfirmationEmail({
      name,
      address,
      pincode,
      phone,
      paymentMode,
      email: req.user_info.email,
      items: allItems,
      totalAmount: createdOrders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      ),
    });

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
    const { name, address, pincode, phone, paymentMode, offerId } = req.body;

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
              seller: "$productDetails.seller",
            },
          },
        },
      },
    ]);

    if (!groupedCart.length) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    let grandSubtotal = 0;
    for (const group of groupedCart) {
      for (const item of group.items) {
        grandSubtotal += item.amount ;
      }
    }
    let deliveryFee = 40;
    let discountValue = 0;
    if (offerId) {
      const coupon = await Coupon.findById(offerId);
      if (coupon) {
        discountValue = Math.round((grandSubtotal * coupon.offer) / 100);
        coupon.usageCount += 1;
        coupon.usedBy.push(req.user_info._id);
        await coupon.save();
      }
    }

    const finalPayableAmount = grandSubtotal + deliveryFee - discountValue;
    console.log(grandSubtotal, discountValue);

    const razorpayorder = await razorpay.orders.create({
      amount: finalPayableAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { userId: req.user_info._id.toString() },
    });

    const createdOrders = [];

    for (const group of groupedCart) {
      let subtotal = 0;
      for (const item of group.items) {
        subtotal += item.amount 
      }

      const totalAmount = subtotal + deliveryFee - discountValue;
      const paidAmountWithoutDelivery = totalAmount - deliveryFee;
      const discountPercent = Math.round(
        ((subtotal - paidAmountWithoutDelivery) / subtotal) * 100
      );

      const order = await Order.create({
        name,
        address,
        pincode,
        phone,
        user: req.user_info._id,
        items: group.items.map((item: any) => ({
          ...item,
          paymentMode,
          Orderstatus: "Pending",
          paymentStatus: "pending",
          razorpayOrderId: razorpayorder.id,
        })),
        subtotal,
        deliveryFee,
        discount: discountPercent,
        totalAmount,
      });

      createdOrders.push(order);
    }

    await Cart.deleteMany({ user: req.user_info._id });
    const allItems = createdOrders.flatMap((order) => order.items);

    await sendOrderConfirmationEmail({
      name,
      address,
      pincode,
      phone,
      paymentMode,
      email: req.user_info.email,
      items: allItems,
      totalAmount: createdOrders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      ),
    });
    res.status(201).json({
      success: true,
      message: "Orders placed successfully",
      orders: createdOrders,
      razorpayOrder: {
        ...razorpayorder,
        key_id: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// ------------------------------
// Razorpay Payment Verification
// ------------------------------
const verifyRazorpayPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
      await Order.deleteOne({ razorpayOrderId: razorpay_order_id });
      return;
    }

    await Order.updateMany(
      { "items.razorpayOrderId": razorpay_order_id },
      {
        $set: {
          "items.$[elem].paymentStatus": "completed",
          "items.$[elem].Orderstatus": "Confirmed",
          "items.$[elem].razorpayPaymentId": razorpay_payment_id,
        },
      },
      {
        arrayFilters: [{ "elem.razorpayOrderId": razorpay_order_id }],
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
    return;
  } catch (err) {
    console.error("Verification Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
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
      deliveryFee: 40,
    });
    return;
  } catch (error) {
    console.error("Error fetching cart total:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user_info?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userOrders = await Order.find({ user: req.user_info._id })
      .sort({ createdAt: -1 })
      .lean();

    if (!userOrders.length) {
      res.status(404).json({ message: "No orders found for this user." });
      return;
    }

    res.status(200).json({
      success: true,
      orders: userOrders,
    });
    return;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

const getSellerOrders = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user_info?._id?.toString();

    if (!sellerId) {
      console.error("Missing seller ID");
      res.status(400).json({ message: "Seller ID missing in request" });
      return;
    }

    const orders: IOrder[] = await Order.find({
      "items.seller": sellerId,
    }).sort({ createdAt: -1 });

    //console.log(`Found ${orders.length} orders for seller ${sellerId}`);

    const sellerOrders = orders
      .map((order: IOrder) => {
        const sellerItems = order.items.filter(
          (item) => item.seller.toString() === sellerId
        );

        if (sellerItems.length === 0) {
          return null;
        }

        return {
          _id: order._id,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          user: order.user,
          name: order.name,
          address: order.address,
          pincode: order.pincode,
          phone: order.phone,
          subtotal: order.subtotal,
          deliveryFee: order.deliveryFee,
          totalAmount: order.totalAmount,
          items: sellerItems,
        };
      })
      .filter(Boolean);

    res.status(200).json(sellerOrders);
    return;
  } catch (error: any) {
    console.error("Error fetching seller orders:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
};

const updateOrderItemStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, productId, sellerId, status } = req.body;

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Dispatched",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ];

    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    const updateFields: any = {
      "items.$[elem].Orderstatus": status,
    };

    // Also update paymentStatus if delivered
    if (status === "Delivered") {
      updateFields["items.$[elem].paymentStatus"] = "completed";
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: orderId,
        "items.product": productId,
        "items.seller": sellerId,
      },
      {
        $set: updateFields,
      },
      {
        new: true,
        arrayFilters: [
          {
            "elem.product": productId,
            "elem.seller": sellerId,
          },
        ],
      }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "Order or item not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Order status update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createOrderCOD,
  createOrderRazorpay,
  verifyRazorpayPayment,
  getCartTotalAmount,
  getUserOrders,
  getSellerOrders,
  updateOrderItemStatus,
};
