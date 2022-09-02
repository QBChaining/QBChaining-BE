import passport from "passport";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// const GitHubStrategy = require('passport-github').Strategy;

import GitHubStrategy from "passport-github";

import User from "../models/user.js";

let id = process.env.GIT_ID;
let secret = process.env.GIT_SECRET;

const github = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: `${id}`,
        clientSecret: `${secret}`,
        callbackURL: "http://13.125.180.179/api/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log("git profile", profile);
        try {
          const exUser = await User.findOne({
            where: { email: profile.profileUrl },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.profileUrl,
              user_name: profile.username,
              name: profile.username,
              rank_point: 0,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

export default github;
