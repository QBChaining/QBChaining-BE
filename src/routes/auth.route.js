import express from 'express';
import passport from 'passport';
import verifyToken from '../middlewares/auth.js';
import jwt from 'jsonwebtoken';
import AuthController from '../controllers/auth.controller.js';

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
        userId: req.user.id,
        userName: req.user.user_name,
        isNew: req.user.is_new,
        profileImg: req.user.profile_img,
      },
      process.env.JWT_SECRET,
      {
        issuer: 'jihun',
      }
    );

    return res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

router.put('/user/isnew', verifyToken, authController.updateInfo);

router.post('/user/info', verifyToken, authController.createUserInfo);
router.put('/user/info', verifyToken, authController.updateUserInfo);

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

router.get('/user/activity', verifyToken, authController.getActivity);

export default router;
