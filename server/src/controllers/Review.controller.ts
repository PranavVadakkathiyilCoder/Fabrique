import { Request, Response } from "express";
import Review from "../models/Review.model";
import Product from "../models/Product.model";

interface AuhtRequest extends Request {
  user_info?: any;
}
 const createReview = async (req: AuhtRequest, res: Response) => {
  try {
    const { product, order, rating, review } = req.body;
    const userId = req.user_info.id; // You must have user extracted via auth middleware

    if (!product || !order || !rating || !review) {
       res.status(400).json({ message: "All fields are required" });
       return
    }

    const existing = await Review.findOne({ user: userId, product });
    if (existing) {
       res.status(400).json({ message: "You already reviewed this product" });
       return
    }

    const newReview = await Review.create({
      user: userId,
      product,
      order,
      rating,
      review,
    });

     res.status(201).json({ message: "Review submitted", review: newReview });
     return
  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};



 const getReviewsForSellerProducts = async (req: AuhtRequest, res: Response) => {
  try {
    
    const sellerId = req.user_info?._id; 


    if (!sellerId) {
       res.status(400).json({ message: "Seller ID is required." });
       return
    }

    
    const sellerProducts = await Product.find({ seller: sellerId }).select("_id");
    const productIds = sellerProducts.map(product => product._id);

    const reviews = await Review.find({ product: { $in: productIds } })
      .populate("user", "name email") // populate user details
      .populate("product", "name images"); // optional: populate product info

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching seller reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews." });
  }
};


export {createReview,getReviewsForSellerProducts}