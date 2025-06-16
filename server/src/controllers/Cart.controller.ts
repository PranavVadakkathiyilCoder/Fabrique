import { Request,Response } from "express";
import Cart from "../models/Cart.model";
import Product from "../models/Product.model";

interface AuhtRequest extends Request {
  user_info?: any;
}
//const addtocart = async(req:AuhtRequest,res:Response)=>{
//    const {product_id,size,color,count,amount} = req.body
//    console.log(product_id,size,color,count,amount);
    
//    const user_id = req.user_info._id
//    if(!product_id||!size||!color||!count||!amount){
//        res.status(500).json({success:false,message: "Data Missing" });
//        return
//    }
//    try {
//        const ExistProduct = await Cart.findOne({
//            product:product_id,size,color,user:user_id
//        })
//        if(ExistProduct){
//            ExistProduct.productcount +=count
//            ExistProduct.amount = count*amount
//            await ExistProduct.save()
//        }
//        else{
//            const addtocart = await Cart.create({
//                product:product_id,
//                    color:color,
//                    size: size,
//                    productcount: count,
//                    amount: count*amount,
//                    user: user_id,
//            }) 
//            await addtocart.save()
            

//        }
//        res.status(201).json({ success:true,message: "Product added to cart", cart: addtocart });
//    } catch (error) {
//        console.log("error on addtocart",error);
//        res.status(500).json({success:false,message: "Internal server error" });
        
//    }
//}
const addtocart = async (req: AuhtRequest, res: Response) => {
  const { product_id, size, color, count, amount } = req.body;
  const user_id = req.user_info._id;

  if (!product_id || !size || !color || !count || !amount) {
     res.status(400).json({ success: false, message: "Data Missing" });
     return
  }

  try {
    // Get the product to check stock
    const product = await Product.findById(product_id);
    if (!product) {
       res.status(404).json({ success: false, message: "Product not found" });
       return
    }

    // Check if requested count is more than available stock
    if (count > product.totalStock) {
       res.status(400).json({
        success: false,
        message: `Only ${product.totalStock} item(s) available in stock.`,
      });
      return
    }

    // Reduce product stock
    product.totalStock -= count;
    await product.save();

    // Add to cart (no merge check logic)
    const cartItem = await Cart.create({
      product: product_id,
      color,
      size,
      productcount: count,
      amount: count * amount,
      user: user_id,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart: cartItem,
    });
  } catch (error) {
    console.error("Error on addtocart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



const getCart = async(req:AuhtRequest,res:Response)=>{

    const user_id = req.user_info._id
    try {
        const getcart = await Cart.find({user:user_id}).populate("product","name images")
        if(!getcart){
            res.status(500).json({success:false,message: "No Items in cart" });
            return
        }
        
        const TotalAmount = getcart.reduce((sum, item) => sum + item.amount, 0);

        res.status(201).json({ success:true,message: "All Cart Items getted", getcart,TotalAmount });



    } catch (error) {
        console.log("error on addtocart",error);
        res.status(500).json({success:false,message: "Internal server error" });
        
    }
}

const deleteitemcart = async(req:AuhtRequest,res:Response)=>{

    const {item_id} = req.body
    console.log(item_id);
    
    try {
        const deleteitem = await Cart.findByIdAndDelete(item_id)
        if(!deleteitem){
            res.status(500).json({success:false,message: "Try Again" });
            return
        }
        
        

        res.status(201).json({ success:true,message: "Item deleted" });



    } catch (error) {
        console.log("error on addtocart",error);
        res.status(500).json({success:false,message: "Internal server error" });
        
    }
}

export {addtocart,getCart,deleteitemcart}