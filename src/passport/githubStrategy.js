import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

// const GitHubStrategy = require('passport-github').Strategy;

import GitHubStrategy from 'passport-github2';

import User from '../models/user.js';

let id = process.env.GIT_ID;
let secret = process.env.GIT_SECRET;

const github = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: `${id}`,
        clientSecret: `${secret}`,
        callbackURL: 'http://localhost:3001/api/auth/github/callback',
        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { name: profile.username },
          });

          if (exUser) {
            if (exUser.is_new == 'false') {
              done(null, exUser);
            } else if (exUser.is_new == 'true') {
              const updateUser = await User.update(
                { is_new: 'false' },
                { where: { name: profile.username } }
              );
              done(null, updateUser);
            } else {
              console.error(error);
              done(error);
            }
          } else {
            const newUser = await User.create({
              email: profile.emails[0].value,
              profile_url: profile.profileUrl,
              user_name: profile.username,
              is_new: 'true',
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
