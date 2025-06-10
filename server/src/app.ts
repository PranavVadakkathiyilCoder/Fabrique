import  express, { Application }  from "express";
import cors from 'cors'
const app:Application = express()

app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb",extended:true}))







import AuthRoute from './routes/Auth.route'
app.use('/api/v1/user',AuthRoute)







export default app
