import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport'
import cookieSession from 'cookie-session'
import authRoutes from "./routes/auth/auth.routes";
import "./config/passport";
import path from 'path';
export const COOKIE_KEY = process.env.COOKIE_KEY as string;
import session from 'express-session';
import router from './routes/index.routes';
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





// app.use(userRouter)
// app.use('/auth',authRouter)


app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});
