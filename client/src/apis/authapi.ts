import axios from "./axios";
 const registerUser = async(formData:FormData)=>{
    return axios.post('/user/register',formData)
}
 const loginUser = async(data:{email:string,password:string})=>{
    return axios.post('/user/login',data)
}
const validateUser = async () => {
    return axios.post('/user/validate')
}
export {registerUser,loginUser,validateUser}