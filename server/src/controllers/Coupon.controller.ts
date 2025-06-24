import { Request, Response } from "express";
import Review from "../models/Review.model";
import Coupon from "../models/Coupon.model";

interface AuthRequest extends Request {
  user_info?: any;
}
const addCoupon = async (req: AuthRequest, res: Response) => {
  try {
    const { code, offer, expiryDate, maxUsage } = req.body;
    console.log(req.body);

    const userId = req.user_info.id;

    if (!code || !offer || !expiryDate || !maxUsage) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existing = await Coupon.findOne({ code: code });
    if (existing) {
      res.status(400).json({ message: "Coupon Already In Use" });
      return;
    }

    const newCoupon = await Coupon.create({
      code,
      offer,
      expiryDate,
      createdBy: userId,
      maxUsage,
    });

    res.status(201).json({ success: true, message: "Coupon Added", newCoupon });
    return;
  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getCoupon = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user_info.id;

    const existing = await Coupon.find({ createdBy: userId });
    if (!existing) {
      res.status(400).json({ message: "You Have No Coupons" });
      return;
    }

    res
      .status(201)
      .json({ success: true, message: "All Coupons", Coupon: existing });
    return;
  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const verifyCoupon = async (req: AuthRequest, res: Response) => {
  try {
    const { coupon } = req.body;
    const userId = req.user_info.id;

    if (!coupon) {
      res
        .status(400)
        .json({ success: false, message: "Coupon code is required" });
      return;
    }

    const existing = await Coupon.findOne({ code: coupon });

    if (!existing) {
      res
        .status(400)
        .json({ success: false, message: "Coupon does not exist" });
      return;
    }

    if (existing.actions === "Block") {
      res.status(400).json({ success: false, message: "Coupon is blocked" });
      return;
    }

    const now = new Date();
    if (existing.expiryDate < now) {
      res.status(400).json({ success: false, message: "Coupon has expired" });
      return;
    }

    if (existing.maxUsage && existing.usageCount >= existing.maxUsage) {
      res
        .status(400)
        .json({ success: false, message: "Coupon usage limit reached" });
      return;
    }

    if (existing.usedBy.includes(userId)) {
      res
        .status(400)
        .json({ success: false, message: "You have already used this coupon" });
      return;
    }

    existing.usageCount += 1;
    existing.usedBy.push(userId);
    await existing.save();

     res.status(200).json({
      success: true,
      message: "Coupon is valid",
      discount: existing.offer || 0,
    });
    return
  } catch (err) {
    console.error("Coupon Verification Error:", err);
     res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
      return
  }
};

const blockCoupon = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user_info.id;
    const { couponId } = req.body;

    if (!couponId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const coupon = await Coupon.findOneAndUpdate(
      { _id: couponId, createdBy: userId },
      { actions: "Block" },
      { new: true }
    );

    if (!coupon) {
      res.status(400).json({ message: "Coupon Block Error" });
      return;
    }

    res.status(201).json({ success: true, message: "Coupon Blocked" });
    return;
  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export { addCoupon, getCoupon, verifyCoupon, blockCoupon };
