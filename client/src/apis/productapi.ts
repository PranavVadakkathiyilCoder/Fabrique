import axios from "./axios";
 const AddProducts = async(formData:FormData)=>{
    return axios.post('/product/addproduct',formData)
}
 const GetAllProduct = async(data:{email:string,password:string})=>{
    return axios.post('/produts',data)
}
const GetSellerProduct = async () => {
    return axios.post('/sellerproduct')
}
export {AddProducts,GetAllProduct,GetSellerProduct}