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

const getCurrentUserInfo = async () => {
    return axios.get('/user/sellerdata')
}

const Logout = async () => {
    return axios.post('/user/logout')
}



export {registerUser,loginUser,validateUser,getCurrentUserInfo,Logout}