import dotenv from 'dotenv';
import express from 'express';
import { userRouter } from './UserModule/userRoutes';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport'
import cookieSession from 'cookie-session'
import authRoutes from "./AuthModule/authRoutes";
import "./config/passport";
import path from 'path';
export const COOKIE_KEY = process.env.COOKIE_KEY as string;
import session from 'express-session';
dotenv.config();

const app = express();
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
const port = 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
mongoose.connect('mongodb://127.0.0.1:27017/pms').then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

app.get("/", (req, res) => {
    res.render("home");
});
app.use("/auth", authRoutes);

app.get('/profile', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    res.render('profile', { user: req.user });
});
app.use(express.json());

// app.use(userRouter)
// app.use('/auth',authRouter)


app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Not Found" });
});
