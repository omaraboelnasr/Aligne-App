import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
import User from "../models/userModels";
import jwt from 'jsonwebtoken';


const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "api/v1/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile : ", profile);
            let user
            user = await User.findOne({ googleId: profile.id });
            // If user doesn't exist creates a new user. (similar to sign up)
            console.log("user : ", user);
            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails?.[0].value,
                    //profile picture ++
                    // we are using optional chaining because profile.emails may be undefined.
                });

            }
            const token = jwt.sign(
                {
                    id: user.id,
                    googleId: user.googleId,
                    displayName: user.username,
                    email: user.email,
                },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            done(null, { user, token });
        }
    )
);
