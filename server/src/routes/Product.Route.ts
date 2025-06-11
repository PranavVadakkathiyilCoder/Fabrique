import { Router } from "express";
import upload from '../middleware/Multer'
import verifyUser from "../middleware/VerifyUser";
import { AddProducts, getSellerProducts, NewArrivels, TopSelling } from "../controllers/Product.controller";
const router = Router()

//router.route('/produts').post( )
router.route('/addproduct').post(verifyUser,upload.fields([{ name: 'images', maxCount: 4 }]),AddProducts)
router.route('/sellerproduct').get(verifyUser,getSellerProducts)
router.route('/newarrivel').get(verifyUser,NewArrivels)
router.route('/topselling').get(verifyUser,TopSelling)

//router.route('/validate').post(validate)

export default router