import  express, { Application }  from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import "./config/Passport";
import passport from "passport";

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

import ReviewRoute from "./routes/Review.route";

app.use('/api/v1/user',AuthRoute)

app.use('/api/v1/product',ProductRoute)

app.use('/api/v1/cart',CartRoute)

app.use('/api/v1/order',OrderRoute)

app.use('/api/v1/review',ReviewRoute)

app.use(passport.initialize());
app.get('/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth' }),
  (req: any, res) => {
    const { accesstoken, refreshtoken, user } = req.user;

    
    res
      .cookie('accesstoken', accesstoken, {
        httpOnly: true,
        secure: true,
        
      })
      .cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        secure: true, 
        
      })
      
      .status(200)
      
        
      
      .redirect('http://localhost:5173');
      
      
  }
);






export default app
