import passport from 'passport';
import User from '../models/user.js';
import github from './githubStrategy.js';

const passportConfig = () => {
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
