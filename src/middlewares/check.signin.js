import exceptionHandler from '../errorhandler/customException.handler.js';
import Jwt from 'jsonwebtoken';
export default (req, res, next) => {
  if (!req.headers.authorization) return next();
  try {
    const [type, value] = req.headers.authorization.split(' ');
    req.user = Jwt.verify(value, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    console.log(err);
    if (err.name == 'TokenExpiredError') return next();
    const exception = exceptionHandler(err);
    res
      .status(exception.statusCode)
      .json({ success: exception.success, message: exception.message });
  }
};
