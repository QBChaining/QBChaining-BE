import express from 'express';
import passport from 'passport';
import verifyToken from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// router.get("/github", passport.authenticate("github", { session: false }));

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
        user_name: req.user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m',
        issuer: 'jihun',
      }
    );
    return res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});
// router.get("/logout", verifyToken, (req, res) => {
//   res.json({ message: "logout" });
// });

export default router;
