import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

// const isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).send("로그인 필요");
//   }
// };

// const isNotLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     next();
//   } else {
//     const message = encodeURIComponent("로그인한 상태입니다.");
//     res.redirect(`/?error=${message}`);
//   }
// };

const verifyToken = (req, res, next) => {
  try {
    const [type, value] = req.headers.authorization.split(' ');
    req.decoded = jwt.verify(value, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};

export default verifyToken;
