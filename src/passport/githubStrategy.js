import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

import GitHubStrategy from 'passport-github2';

import User from '../models/user.js';

let id = process.env.GIT_ID;
let secret = process.env.GIT_SECRET;
let url = process.env.GIT_URL;

const github = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: `${id}`,
        clientSecret: `${secret}`,
        callbackURL: `${url}`,

        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { userName: profile.username },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.emails[0].value,
              profileUrl: profile.profileUrl,
              userName: profile.username,
              profileImg: profile._json.avatar_url,
              isNew: 'true',
            });
            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export default github;
