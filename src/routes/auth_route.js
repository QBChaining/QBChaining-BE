import express from 'express';
import passport from 'passport';
import verifyToken from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import AuthController from '../controllers/auth_controller.js';

const router = express.Router();

const authController = new AuthController();

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'], session: false })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        name: req.user.user_name,
        is_new: req.user.is_new,
      },
      process.env.JWT_SECRET,
      {
        issuer: 'jihun',
      }
    );

    return res.redirect(`http://localhost:3000/login?token=${token}`);
    // return res.json({ response: req.user, token });
  }
);

router.put('/user/info', verifyToken, authController.updateInfo);

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

export default router;
