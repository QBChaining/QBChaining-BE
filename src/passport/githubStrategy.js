import passport from 'passport';

// const GitHubStrategy = require('passport-github').Strategy;

import GitHubStrategy from 'passport-github';

import User from '../models/user.js';

const github = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GIT_ID,
        clientSecret: process.env.GIT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/github/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('git profile', profile);
        try {
          const exUser = await User.findOne({
            where: { email: profile.profileUrl },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            console.log(profile);
            const newUser = await User.create({
              email: profile.profileUrl,
              user_name: profile.username,
              name: profile.username,
              //   snsId: profile.id,
              //   provider: 'github',
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
