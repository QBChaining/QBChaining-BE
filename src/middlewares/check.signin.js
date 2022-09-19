import exceptionHandler from '../errorhandler/customException_handler.js';
import Jwt from 'jsonwebtoken';
const check_signin = (req, res, next) => {
  if (!req.headers.authorization) return next();
  try {
    const [type, value] = req.headers.authorization.split(' ');
    req.user = Jwt.verify(value, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    console.log(err);
    const exception = exceptionHandler(err);
    res
      .status(exception.statusCode)
      .json({ success: exception.success, message: exception.message });
  }
};
export default check_signin;
