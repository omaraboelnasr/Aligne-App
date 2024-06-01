import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
import User from "../AuthModule/userModels";


const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect",
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
                if (user) {
                    done(null, user);
                }
            } else {
                done(null, user);
            }

        }
    )
);


passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
