import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
    // this will render login.ejs file
    res.json({ message: "Login Page" });
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);


router.get("/google/redirect", passport.authenticate("google", { session: false }), (req, res) => {
    if (req.user && req.user.token) {
        res.json({ token: req.user.token });
    } else {
        res.json({ message: "Something went wrong" });
    }
});


router.get('/profile', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    res.render('profile', { user: req.user });
});

router.get("/logout", (req, res) => {
    res.json({ message: "Logged Out" });
}

);

export default router;
