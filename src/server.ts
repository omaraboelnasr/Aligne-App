import dotenv from 'dotenv';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport'
import "./config/passport";
export const COOKIE_KEY = process.env.COOKIE_KEY as string;
import router from './routes/index.routes';
import { HttpError } from './utils/customErrors';
dotenv.config();

const app = express();

app.use(passport.initialize());
const port = 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
mongoose.connect('mongodb://127.0.0.1:27017/pms').then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

app.use(
    cors({
        origin:'http://localhost:5173',
    })
)
app.use(express.json());
app.use('/', router);

// global error handler
app.use((err:HttpError,req:Request,res:Response,next:NextFunction):any=>{
    res.status(err.statusCode||500).json({message:err.message||'internal server error',errorCode:err.errCode})
})

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Not Found..." });
});
