import { Router } from "express";
import { createOrderCOD,getCartTotalAmount,createOrderRazorpay, verifyRazorpayPayment, getUserOrders, getSellerOrders } from "../controllers/Order.controller";
import verifyUser from "../middleware/VerifyUser";
const router = Router()

router.route('/placeordercod').post(verifyUser,createOrderCOD)
router.route('/placeorderrazorpay').post(verifyUser,createOrderRazorpay)

router.route('/gettotalamount').get(verifyUser,getCartTotalAmount)
//router.route('/verifyRazorpayPayment').post(verifyUser,deleteitemcart)
router.route('/verify-razorpay').post(verifyUser,verifyRazorpayPayment)
router.route('/getuserorder').get(verifyUser,getUserOrders)
router.route('/getsellerorder').get(verifyUser,getSellerOrders)




 


export default router