import { Request, Response } from "express";
import { uploadToCloudinary } from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import Product from "../models/Product.model";
interface AuhtRequest extends Request {
  user_info?: any;
}
const AddProducts = async(req: AuhtRequest, res: Response) => {
  try {
    const { name, price, oldprice, description, colors, sizes, totalStock } = req.body;
    const files = (req.files as { [fieldname: string]: Express.Multer.File[] })
      ?.images;
    if (!name || !description || !colors || !sizes || !totalStock || !files || files.length !== 4) {
       res.status(400).json({ message: "All fields and 4 images are required" });
       return
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

export { AddProducts };
