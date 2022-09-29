import jwt from 'jsonwebtoken';
import AuthService from '../services/auth.service.js';
import exceptionHandler from '../errorhandler/customException.handler.js';

export default class AuthController {
  authService = new AuthService();

  updateUser = async (req, res, next) => {
    const userId = req.decoded.userId;
    try {
      const user = await this.authService.userUpdate(userId);

      const token = jwt.sign(
        {
          userId: req.user.id,
          userName: req.user.userName,
          isNew: req.user.isNew,
          profileImg: req.user.profileImg,
        },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      );

      return res.status(200).json({ success: true, token });
    } catch (error) {
      console.log(err);
      const exception = exceptionHandler(err);

      res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  createUserInfo = async (req, res, next) => {
    const language = req.body.language;
    const age = req.body.age;
    const gender = req.body.gender;
    const job = req.body.job;
    const career = req.body.career;
    const userId = req.decoded.userId;

    try {
      const userInfo = await this.authService.userInfoCreate(
        language,
        age,
        gender,
        job,
        career,
        userId
      );

      return res
        .status(200)
        .json({ success: true, message: '유저 정보 등록 성공' });
    } catch (error) {
      console.log(err);
      const exception = exceptionHandler(err);

      res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  updateUserInfo = async (req, res, next) => {
    const language = req.body.language;
    const age = req.body.age;
    const gender = req.body.gender;
    const job = req.body.job;
    const career = req.body.career;
    const userId = req.decoded.userId;

    try {
      const userInfo = await this.authService.userInfoUpdate(
        language,
        age,
        gender,
        job,
        career,
        userId
      );

      return res
        .status(200)
        .json({ success: true, message: '유저 정보 수정 성공' });
    } catch (error) {
      console.log(err);
      const exception = exceptionHandler(err);

      res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  getActivity = async (req, res, next) => {
    const userName = req.params.userName;

    try {
      const userActivity = await this.authService.getUserActivity(userName);

      return res.status(200).json({ success: true, userActivity });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  getUserPage = async (req, res, next) => {
    const userName = req.params.userName;

    try {
      const userPageInfo = await this.authService.getUserPage(userName);
      console.log(userPageInfo);
      return res
        .status(200)
        .json({ success: true, message: `${userName}의 페이지`, userPageInfo });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  getUserRank = async () => {};
}
