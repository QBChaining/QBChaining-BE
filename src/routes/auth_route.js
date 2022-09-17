import express from 'express';
import passport from 'passport';
import verifyToken from '../middlewares/auth.js';
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
        profile_img: req.user.profile_img,
      },
      process.env.JWT_SECRET,
      {
        issuer: 'jihun',
      }
    );

    return res.redirect(
      `http://qb-chaning.s3-website.ap-northeast-2.amazonaws.com/login?token=${token}`
    );
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
