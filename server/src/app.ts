import  express, { Application }  from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
const app:Application = express()

app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(express.static("public"));
app.use(cookieParser());







import AuthRoute from './routes/Auth.route'
app.use('/api/v1/user',AuthRoute)


import ProductRoute from './routes/Product.Route'
app.use('/api/v1/product',ProductRoute)




export default app
