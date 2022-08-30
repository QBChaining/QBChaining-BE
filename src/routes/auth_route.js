import express from 'express';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/authMiddleware.js';
// import AuthController from '../controllers/auth_controller.js';

const router = express.Router();

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

export default router;
