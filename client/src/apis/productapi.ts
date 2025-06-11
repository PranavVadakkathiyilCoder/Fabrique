import axios from "./axios";
 const AddProducts = async(formData:FormData)=>{
    return axios.post('/product/addproduct',formData)
}
 const GetAllProduct = async(data:{email:string,password:string})=>{
    return axios.post('/produts',data)
}
const GetSellerProduct = async () => {
    return axios.get('/product/sellerproduct')
}
const TopSellingProduct = async () => {
    return axios.get('/product/topselling')
}
const NewArrivelsProduct = async () => {
    return axios.get('/product/newarrivel')
}
export {AddProducts,GetAllProduct,GetSellerProduct,TopSellingProduct,NewArrivelsProduct}