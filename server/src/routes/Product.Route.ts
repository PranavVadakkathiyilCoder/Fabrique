import { Router } from "express";
import upload from '../middleware/Multer'
import verifyUser from "../middleware/VerifyUser";
import { Accessories, AddProducts, getSellerProducts, NewArrivels, TopSelling,AllProducts,SingleProduct, searchProducts, filterProducts, getStatsSeller, getStatsForAdmin, getAllSellersWithStats, getAllProductsForAdmin, getAllUsersForAdmin } from "../controllers/Product.controller";
const router = Router()

//router.route('/produts').post( )
router.route('/addproduct').post(verifyUser,upload.fields([{ name: 'images', maxCount: 4 }]),AddProducts)
router.route('/sellerproduct').get(verifyUser,getSellerProducts)
router.route('/newarrivel').get(verifyUser,NewArrivels)
router.route('/topselling').get(verifyUser,TopSelling)
router.route('/accessories').get(verifyUser,Accessories)
router.route('/allproducts').get(verifyUser,AllProducts)
router.route('/singleproduct').get(verifyUser,SingleProduct)
router.route('/search').get(verifyUser,searchProducts)
router.route('/filter').get(verifyUser,filterProducts)
router.route('/categorycount').get(verifyUser,getStatsSeller)
router.route('/getstatsadmin').get(verifyUser,getStatsForAdmin)
router.route('/sellerinfoadmin').get(verifyUser,getAllSellersWithStats)
router.route('/productinfoadmin').get(verifyUser,getAllProductsForAdmin)
router.route('/getalluserinfoadmin').get(verifyUser,getAllUsersForAdmin)





//router.route('/validate').post(validate)

export default router