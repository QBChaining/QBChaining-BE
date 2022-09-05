import express from "express";
import passport from "passport";
import verifyToken from "../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// router.get("/github", passport.authenticate("github", { session: false }));
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  (req, res) => {
    // console.log(user);
    // const token = jwt.sign(
    //   {
    //     id: req.user.id,
    //     name: req.user.user_name,
    //     // new : true or false
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: "15m",
    //     issuer: "jihun",
    //   }
    // );
    // return res.redirect(`http://localhost:3001?token=${token}`);
    return res.json({ response: req.user });
  }
);

router.get("/test", verifyToken, (req, res) => {
  res.json(req.decoded);
});
// router.get("/logout", verifyToken, (req, res) => {
//   res.json({ message: "logout" });
// });

export default router;
