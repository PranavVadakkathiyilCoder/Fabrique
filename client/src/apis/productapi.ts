import axios from "./axios";
 const AddProducts = async(formData:FormData)=>{
    return axios.post('/product/addproduct',formData)
}
 const GetAllProduct = async()=>{
    return axios.get('/product/allproducts')
}
const GetSellerProduct = async () => {
    return axios.get('/product/sellerproduct')
}
const GetSingleProduct = async (product_id:string) => {
    return axios.get('/product/singleproduct',{
    params: { id: product_id }
  })
}
const TopSellingProduct = async () => {
    return axios.get('/product/topselling')
}
const NewArrivelsProduct = async () => {
    return axios.get('/product/newarrivel')
}
const GetAccessories = async () => {
    return axios.get('/product/accessories')
}
export {AddProducts,GetAllProduct,GetSellerProduct,TopSellingProduct,NewArrivelsProduct,GetAccessories,GetSingleProduct}