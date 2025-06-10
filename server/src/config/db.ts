import { connect } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI!
const DBConnect = async()=>{
    try {
        const conn = await connect(MONGODB_URI)
        console.log("DB connected with host -:-",conn.connection.host);
        
    } catch (error) {
        console.log("DB Conncetion Faild -:-",error);
        
    }
}
export default DBConnect