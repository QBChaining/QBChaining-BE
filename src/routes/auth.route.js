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
        userName: req.user.userName,
        isNew: req.user.isNew,
        profileImg: req.user.profileImg,
      },
      process.env.JWT_SECRET,
      {
        issuer: 'jihun',
      }
    );

    return res.redirect(`https://www.qb-chaning.com/login?token=${token}`);
    // return res.redirect(`http://localhost:3000/login?token=${token}`);
    // return res.json({ token });
  }
);
router.put('/user/isnew', verifyToken, authController.updateUser);
router.post('/user/info', verifyToken, authController.createUserInfo);
router.put('/user/info', verifyToken, authController.updateUserInfo);
router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});
router.get('/user/activity/:userName', authController.getActivity);
router.get('/user/page/:userName', authController.getUserPage);

export default router;
