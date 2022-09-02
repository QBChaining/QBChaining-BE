import express from "express";
import passport from "passport";
import verifyToken from "../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/github", passport.authenticate("github", { session: false }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        name: req.user.user_name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
        issuer: "jihun",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다",
      token,
    });
  }
);

// router.get("/logout", verifyToken, (req, res) => {
//   res.json({ message: "logout" });
// });

export default router;
