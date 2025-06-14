import  express, { Application }  from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
const app:Application = express()

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(express.static("public"));
app.use(cookieParser());







import AuthRoute from './routes/Auth.route'


import ProductRoute from './routes/Product.Route'


import CartRoute from './routes/Cart.route'


import OrderRoute from './routes/Order.route'

app.use('/api/v1/user',AuthRoute)

app.use('/api/v1/product',ProductRoute)

app.use('/api/v1/cart',CartRoute)

app.use('/api/v1/order',OrderRoute)







export default app
