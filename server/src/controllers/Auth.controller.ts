import { Request, Response } from "express";
import User from "../models/User.model";
import { uploadToCloudinary } from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import Order from "../models/Order.model";
import Cart from "../models/Cart.model";
import AccessandRefreshToken from "../config/AccessandRefreshToken";

interface AuhtRequest extends Request {
  user_info?: any;
}
//const AccessandRefreshToken = async (
//  userId: string
//): Promise<{ accesstoken: string; refreshtoken: string }> => {
//  try {
//    const user = await User.findById(userId);

//    const accesstoken =  user.AccessToken();
//    const refreshtoken =  user.RefreshToken();
//    user.refreshToken = refreshtoken;
//    await user.save();
//    return { accesstoken, refreshtoken };
//  } catch (error) {
//    console.log(error);
//    throw error;
//  }
//};
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const avatarPath = (
    req.files as { [fieldname: string]: Express.Multer.File[] }
  )?.avatar?.[0].path;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fileds required" });
      return;
    }
    const exisitUser = await User.findOne({ email });
    if (exisitUser) {
      res.status(200).json({ message: "User Already Exist" });
      return;
    }
    let picurl: UploadApiResponse | null | undefined;
    if (avatarPath) {
      picurl = await uploadToCloudinary(avatarPath);
    }
    const user = await User.create({
      name,
      email,
      password,
      pic: picurl?.secure_url,
    });
    if (user) {
      const { accesstoken, refreshtoken } = await AccessandRefreshToken(
        user._id
      );

      const option = {
        httpOnly: true,
        secure: true,
      };
      res.status(201).cookie("accesstoken", accesstoken, option).json({
        message: "User Registerd Successfully",
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: accesstoken,
        role: user.role,
      });
    }
  } catch (error) {
    console.log("Register error", error);
  }
};
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(200).json({ message: "Please Signup" });
      return;
    }
    const checkPassword = await user.isPasswordCorrect(password);

    if (!checkPassword) {
      res.status(200).json({ message: "Password Incorrect" });
      return;
    }
    const option = {
      httpOnly: true,
      secure: true,
    };
    const { accesstoken, refreshtoken } = await AccessandRefreshToken(user._id);

    res
      .status(201)
      .cookie("accesstoken", accesstoken, option)
      .cookie("refresh", refreshtoken, option)
      .json({
        success: true,

        message: "Login Successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: accesstoken,
        role: user.role,
      });
  } catch (error) {
    console.log("Login error", error);
  }
};

const LogOut = async (req: AuhtRequest, res: Response) => {
  try {
    const user = req.user_info?._id;
    if (!user) {
      res.status(200).json({ message: "Not Valid User" });
      return;
    }
    const option = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(201)
      .clearCookie("accesstoken", option)
      .clearCookie("refreshtoken", option)
      .json({
        success: true,
        message: "Logout success",
      });
  } catch (error) {
    console.log("Logout error", error);
  }
};

const validateuser = async (req: AuhtRequest, res: Response) => {
  const userInfo = req.user_info;
  if (!userInfo) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const user = await User.findById(userInfo._id); // You may need user to check role/email match

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }
  const { accesstoken, refreshtoken } = await AccessandRefreshToken(user._id);

  res
    .status(200)
    .json({ success: true, message: "validuser", user, accesstoken });
};
const getAllUsers = async (req: AuhtRequest, res: Response) => {
  const { search } = req.query;
  const SearchResult = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(SearchResult).find({
    _id: { $ne: req.user_info._id },
  });
  if (!users) res.status(400).json({ message: "No users" });
  res.status(200).json({ message: "get all users", users });
};

//const hi = async()=>{
//  const dser =await User.deleteMany({})
//  console.log(dser);

//}
//hi()
const getCurrentSellerInfo = async (req: AuhtRequest, res: Response) => {
  try {
    const sellerId = req.user_info?._id;

    if (!sellerId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const orderCount = await Order.countDocuments({
      items: {
        $elemMatch: {
          seller: sellerId,
          Orderstatus: { $in: ["Confirmed", "Pending"] },
        },
      },
    });

    const userdata = await User.findById(sellerId).select(
      "_id name email pic role"
    );

    res.status(200).json({
      success: true,
      userdata,
      orderCount, // total confirmed + pending
    });
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const logoutUser = async (req: AuhtRequest, res: Response) => {
  try {
    if (!req.user_info || !req.user_info._id) {
      res.status(401).json({ message: "Unauthorized: Invalid user" });
      return;
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict" as const,
    };

    res
      .clearCookie("accesstoken", options)
      .clearCookie("refresh", options)
      .status(200)
      .json({
        success: true,
        message: "User logged out successfully",
        clearLocalStorage: true,
      });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error while logging out" });
  }
};
const getCurrentUserInfo = async (req: AuhtRequest, res: Response) => {
  try {
    const userId = req.user_info?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const cartCount = await Cart.countDocuments({ user: userId });

    const userdata = await User.findById(userId).select(
      "_id name email pic role"
    );

    res.status(200).json({
      success: true,
      userdata,
      cartCount,
    });
  } catch (error) {
    console.error("Error in getCurrentUserInfo:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};
const changeRole = async (req: AuhtRequest, res: Response) => {
  try {
    const userId = req.user_info?._id;
    const {id,role} = req.body;
    if (!id||!role) {
      res.status(401).json({ success: false, message: "User And role needed" });
      return;
    }

    const user = await User.findById(id).select("-password")
    if(!user){
      res.status(401).json({ success: false, message: "User no founded" });
      return;
    }    
    user.role = role
    user.save()

    
 
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Error in get role change:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export {
  registerUser,
  loginUser,
  getAllUsers,
  LogOut,
  getCurrentUserInfo,
  logoutUser,
  getCurrentSellerInfo,
  validateuser,
  changeRole
};
