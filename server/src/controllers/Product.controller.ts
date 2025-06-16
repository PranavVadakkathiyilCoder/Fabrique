import { Request, Response } from "express";
import { uploadToCloudinary } from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import Product from "../models/Product.model";
import { resolveSoa } from "dns";
import Order from "../models/Order.model";
import Review from "../models/Review.model";
import User from "../models/User.model";
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
const searchProducts = async (req: Request, res: Response) => {
  try {
    const search = req.query.q;
    console.log(search,"serach");
    
    if (!search || typeof search !== 'string' || search.trim() === '') {
       res.status(400).json({ message: 'Search search is required' });
       return
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        //{ description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ]
    });

    res.status(200).json({products});
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error while searching products' });
  }
};
const filterProducts = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, rating, selling } = req.query;
    console.log(category, minPrice, maxPrice, rating, selling);
    
    const filters: any = {};

    // Category
    if (category) filters.category = category;

    // Price Range
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    // Rating
    if (rating) filters.rating = { $gte: Number(rating) };

    // Selling Type
    if (selling === "Top Selling") filters.topSelling = true;
    if (selling === "New Arrivals") filters.newArrival = true;

    // Fetch filtered products
    const products = await Product.find(filters);
    console.log(products);
    
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getStatsSeller = async (req: AuhtRequest, res: Response) => {
  try {
    const sellerId = req.user_info?._id;

    if (!sellerId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // 1. Category-wise product count
    const categoryCounts = await Product.aggregate([
      { $match: { seller: sellerId } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // 2. Total stock
    const stockAgg = await Product.aggregate([
      { $match: { seller: sellerId } },
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$totalStock" },
        },
      },
    ]);
    const totalStock = stockAgg[0]?.totalStock || 0;

    // 3. Total orders
    const totalOrders = await Order.countDocuments({
      items: {
        $elemMatch: {
          seller: sellerId,
          Orderstatus: { $in: ["Pending", "Confirmed"] },
        },
      },
    });

    // 4. Total earnings
    const earningsAgg = await Order.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.seller": sellerId,
          "items.paymentStatus": "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$items.amount" },
        },
      },
    ]);
    const totalEarnings = earningsAgg[0]?.totalEarnings || 0;

    // 5. Monthly earnings
    const currentYear = new Date().getFullYear();
    const monthlyAgg = await Order.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.seller": sellerId,
          "items.paymentStatus": "completed",
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59Z`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          total: { $sum: "$items.amount" },
        },
      },
    ]);
    const monthlyEarningsArray = Array(12).fill(0);
    monthlyAgg.forEach((entry) => {
      const monthIndex = entry._id.month - 1;
      monthlyEarningsArray[monthIndex] = entry.total;
    });

    // 6. Average rating of seller's products
    const avgReviewAgg = await Review.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      { $match: { "productInfo.seller": sellerId } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]);
    const avgReviewRating = avgReviewAgg[0]?.avgRating || 0;

    // 7. Count of "Pending" or "Confirmed" orders for this seller
    

    // Final response
    res.status(200).json({
      success: true,
      data: {
        categoryCounts,
        totalStock,
        totalOrders,
        totalEarnings,
        monthlyEarningsArray,
        avgReviewRating: Number(avgReviewRating.toFixed(2)),
        
      },
    });
  } catch (error) {
    console.error("Error fetching seller stats:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getStatsForAdmin = async (req: AuhtRequest, res: Response) => {
  try {
    const sellerId = req.user_info?._id;

    if (!sellerId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const categoryCounts = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // 2. Total stock across all products
    const stockAgg = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$totalStock" },
        },
      },
    ]);
    const totalStock = stockAgg[0]?.totalStock || 0;

    // 3. Total active orders (Pending or Confirmed)
    const totalOrders = await Order.countDocuments({
      items: {
        $elemMatch: {
          Orderstatus: { $in: ["Pending", "Confirmed"] },
        },
      },
    });

    // 4. Total earnings across all completed payments
    const earningsAgg = await Order.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.paymentStatus": "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$items.amount" },
        },
      },
    ]);
    const totalEarnings = earningsAgg[0]?.totalEarnings || 0;

    // 5. Monthly earnings (Jan–Dec)
    const currentYear = new Date().getFullYear();
    const monthlyAgg = await Order.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.paymentStatus": "completed",
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59Z`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          total: { $sum: "$items.amount" },
        },
      },
    ]);
    const monthlyEarningsArray = Array(12).fill(0);
    monthlyAgg.forEach((entry) => {
      const monthIndex = entry._id.month - 1;
      monthlyEarningsArray[monthIndex] = entry.total;
    });

    // 6. Average review rating across all products
    const avgReviewAgg = await Review.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]);
    const avgReviewRating = avgReviewAgg[0]?.avgRating || 0;

    // Final response
    res.status(200).json({
      success: true,
      data: {
        categoryCounts,
        totalStock,
        totalOrders,
        totalEarnings,
        monthlyEarningsArray,
        avgReviewRating: Number(avgReviewRating.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("Error fetching stats for all sellers:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const getAllSellersWithStats = async (req: Request, res: Response) => {
  try {
    const sellers = await User.find({ role: "seller" }).select("_id name");

    const data = await Promise.all(
      sellers.map(async (seller) => {
        const products = await Product.find({ seller: seller._id }).select("_id");
        const productIds = products.map((p) => p._id);

        // Total Products
        const totalProducts = products.length;

        // Avg Rating from all product reviews
        const ratingAgg = await Review.aggregate([
          { $match: { product: { $in: productIds } } },
          {
            $group: {
              _id: null,
              avgRating: { $avg: "$rating" },
            },
          },
        ]);
        const avgRating = ratingAgg[0]?.avgRating || 0;

        // Total Orders (sum of items for this seller)
        const totalOrders = await Order.aggregate([
          { $unwind: "$items" },
          { $match: { "items.seller": seller._id } },
          { $count: "orderCount" },
        ]);
        const orderCount = totalOrders[0]?.orderCount || 0;

        return {
          _id: seller._id,
          sellerName: seller.name,
          avgRating: avgRating.toFixed(1),
          totalProducts,
          totalOrders: orderCount,
           // placeholder, add from User if available
        };
      })
    );

     res.status(200).json({ success: true, sellers: data });
     return
  } catch (error) {
    console.error("Error fetching seller stats:", error);
     res.status(500).json({ success: false, message: "Server Error" });
     return
  }
};
const getAllProductsForAdmin = async (req: Request, res: Response) => {
  try {
    const productDetails = await Product.aggregate([
      // Populate seller
      {
        $lookup: {
          from: 'users',
          localField: 'seller',
          foreignField: '_id',
          as: 'sellerInfo',
        },
      },
      {
        $unwind: {
          path: '$sellerInfo',
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup Reviews
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'product',
          as: 'productReviews',
        },
      },

      // Lookup Orders
      {
        $lookup: {
          from: 'orders',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$$productId', '$orderItems.product'],
                },
              },
            },
          ],
          as: 'productOrders',
        },
      },

      // Project Final Fields
      {
        $project: {
          _id: 1,
          name: 1,
          image: { $arrayElemAt: ['$images', 0] },
          colors: 1,
          sizes: 1,
          totalStock: {
            $sum: {
              $map: {
                input: '$variants',
                as: 'v',
                in: '$$v.stock',
              },
            },
          },
          avgRating: {
            $cond: [
              { $gt: [{ $size: '$productReviews' }, 0] },
              {
                $round: [
                  {
                    $avg: '$productReviews.rating',
                  },
                  1,
                ],
              },
              '0.0',
            ],
          },
          reviewCount: { $size: '$productReviews' },
          sellerName: '$sellerInfo.name',
          orderCount: { $size: '$productOrders' },
        },
      },
    ]);

    res.status(200).json({ success: true, products: productDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllUsersForAdmin = async (req: Request, res: Response) => {
  try {
    const users = await User.aggregate([
      {
        $match: { role: { $ne: 'admin' } } // 🔍 Exclude admin users
      },
      {
        $project: {
          name: 1,
          email: 1,
          
          role: 1,
          status: {
            $cond: { if: "$isBlocked", then: "Blocked", else: "Active" }
          }
        }
      }
    ]);

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
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
  searchProducts,
  filterProducts,
  getStatsSeller,
  getStatsForAdmin,
  getAllSellersWithStats,
  getAllProductsForAdmin,
  getAllUsersForAdmin,
};
