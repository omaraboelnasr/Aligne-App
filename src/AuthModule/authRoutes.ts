import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
    // this will render login.ejs file
    res.render("login");
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);

router.get(
    "/logout",

);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    console.log("req.session : ", req.session);
    res.redirect("/profile");
});

export default router;
