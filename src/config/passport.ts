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
            // passReqToCallback   : true
        },
        (accessToken, refreshToken, profile, done) => {
            // get profile details
            // save profile details in db
        }
    )
);


passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({ googleId: profile.id });
            // If user doesn't exist creates a new user. (similar to sign up)
            if (!user) {
                const newUser = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0].value,
                    //profile picture ++
                    // we are using optional chaining because profile.emails may be undefined.
                });
                if (newUser) {
                    done(null, newUser);
                }
            } else {
                done(null, user);
            }
        }
    )
);


passport.serializeUser((user, done) => {
//   done(null, user.id);
});

passport.deserializeUser((id, done) => {
// Find user by ID and return user object
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
});