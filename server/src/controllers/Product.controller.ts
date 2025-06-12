import { Request, Response } from "express";
import { uploadToCloudinary } from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import Product from "../models/Product.model";
import { resolveSoa } from "dns";
interface AuhtRequest extends Request {
  user_info?: any;
}
const AddProducts = async (req: AuhtRequest, res: Response) => {
  try {
    const {
      name,
      price,
      oldprice,
      description,
      colors,
      sizes,
      totalStock,
      category,
    } = req.body;
    const files = (req.files as { [fieldname: string]: Express.Multer.File[] })
      ?.images;
    if (
      !name ||
      !description ||
      !colors ||
      !sizes ||
      !totalStock ||
      !files ||
      files.length !== 4
    ) {
      res.status(400).json({ message: "All fields and 4 images are required" });
      return;
    }
    const uploadedImages: string[] = [];
    for (const file of files) {
      const result = await uploadToCloudinary(file.path);
      if (result && result.secure_url) {
        uploadedImages.push(result.secure_url);
      } else {
        res.status(500).json({ message: "Image upload failed" });
        return;
      }
    }
    const newProduct = await Product.create({
      name,
      price,
      oldprice,
      description,
      images: uploadedImages,
      category,
      colors: typeof colors === "string" ? colors.split(",") : colors,
      sizes: typeof sizes === "string" ? sizes.split(",") : sizes,
      totalStock,
      seller: req.user_info._id,
    });
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error in AddProducts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSellerProducts = async (req: AuhtRequest, res: Response) => {
  try {
    const seller_id = req.user_info._id;
    const products = await Product.find({ seller: seller_id });
    //.populate(
    //  "seller",
    //  "name email pic"
    //);
    if (!products) {
      res.status(400).json({ success: false, message: "failed to get seller" });
    }
    res.status(200).json({
      success: true,
      message: "Seller get successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products. Please try again later.",
    });
  }
};

const NewArrivels = async (req: AuhtRequest, res: Response) => {
  try {
    const products = await Product.aggregate([
      { $match: { category: "NewArrivels" } },
      { $limit: 4 },
    ]);
    if (!products) {
      res.status(400).json({ success: false, message: "Not Such Category" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "NewArrivels Fetched",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "error on server",
    });
  }
};
const TopSelling = async (req: AuhtRequest, res: Response) => {
  try {
    const products = await Product.aggregate([
      { $match: { category: "TopSelling" } },
      { $limit: 4 },
    ]);
    if (!products) {
      res.status(400).json({ success: false, message: "Not Such Category" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "TopSellings Fetched",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "error on server",
    });
  }
};

const Accessories = async (req: AuhtRequest, res: Response) => {
  try {
    const products = await Product.find({
      category: { $in: ["Footwear", "Accessories"] },
    }).limit(4);
    if (!products) {
      res.status(400).json({ success: false, message: "Not Such Accessories" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Accessories Fetched",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "error on server",
    });
  }
};
const AllProducts = async (req: AuhtRequest, res: Response) => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(400).json({ success: false, message: "Not Products" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Products Fetched",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "error on server",
    });
  }
};
const SingleProduct = async (req: AuhtRequest, res: Response) => {
  try {
    const product_id = req.query.id;
    const product = await Product.findById(product_id);
    if (!product) {
      res.status(400).json({ success: false, message: "Not Product" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "error on server",
    });
  }
};

export {
  AddProducts,
  getSellerProducts,
  NewArrivels,
  TopSelling,
  Accessories,
  AllProducts,
  SingleProduct,
};
