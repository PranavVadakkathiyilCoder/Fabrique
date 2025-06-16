import { Response,NextFunction,Request } from "express"
import jwt,{JwtPayload} from "jsonwebtoken";
import dotenv from 'dotenv'
import User from "../models/User.model"
dotenv.config()
interface AuhtRequest extends Request {
  user_info?: any; 
}
const verifyUser =async(req:AuhtRequest,res:Response,next:NextFunction)=>{

    try {
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "");


    if(!token){
        res.status(400).json({success:false,message:"User Unauthorized"})
        return
    }
    const tokendecode = await jwt.verify(token,process.env.JWT_SECRET!)as JwtPayload
    const userdata = await User.findById(tokendecode?._id).select("-password");
    if(!userdata){ res.status(400).json({message:"No user Exist"} ); return}
    req.user_info = userdata
    next()
    } catch (error) {
        console.log("Error on VerifyUser",error);
        
    }
    
}
export default verifyUser