import { Router } from "express";
import { addtocart,deleteitemcart,getCart } from "../controllers/Cart.controller";
import verifyUser from "../middleware/VerifyUser";
const router = Router()

router.route('/addtocart').post(verifyUser,addtocart)
router.route('/getcart').get(verifyUser,getCart)
router.route('/deleteitem').post(verifyUser,deleteitemcart)

 


export default router