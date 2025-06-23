import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import User from "../models/User.model";
import AccessandRefreshToken from "./AccessandRefreshToken";
dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log(accessToken, refreshToken, profile);

        const user = await User.findOne({ email: profile._json.email });
        if (!user) {
          const password =
            profile.id.substring(profile.id.length - 6) +
            profile._json.name!.substring(profile._json.name!.length - 6);
          const user = await User.create({
            name: profile._json.name,
            email: profile._json.email,
            password: password,
          });
          const { accesstoken, refreshtoken } = await AccessandRefreshToken(
            user._id
          );
          return cb(null, {
            user,
            accesstoken,
            refreshtoken,
          });
        }
        const { accesstoken, refreshtoken } = await AccessandRefreshToken(
          user._id
        );
        return cb(null, { user, accesstoken, refreshtoken });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
