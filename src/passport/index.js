import passport from 'passport';
import github from './githubStrategy.js';
import User from '../models/user.js';

const passportConfig = () => {
  // user.id 확인하기
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  github();
};

export default passportConfig;
