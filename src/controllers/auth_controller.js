import jwt from 'jsonwebtoken';
import AuthService from '../services/auth_service.js';

export default class AuthController {
  authService = new AuthService();

  updateInfo = async (req, res, next) => {
    const user_id = req.decoded.id;
    try {
      const user = await this.authService.infoUpdate(user_id);

      const token = jwt.sign(
        {
          id: user.id,
          name: user.user_name,
          is_new: user.is_new,
          profile_img: req.user.profile_img,
        },
        process.env.JWT_SECRET,
        {
          issuer: 'jihun',
        }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  };

  createUserInfo = async (req, res, next) => {
    const language = req.body.language;
    const age = req.body.age;
    const gender = req.body.gender;
    const job = req.body.job;
    const career = req.body.career;
    const user = req.decoded.id;

    try {
      const userInfo = await this.authService.userInfoCreate(
        language,
        age,
        gender,
        job,
        career,
        user
      );

      return res
        .status(200)
        .json({ success: 'ok', message: '유저 정보 등록 성공' });
    } catch (error) {
      return next(error);
    }
  };

  updateUserInfo = async (req, res, next) => {
    const language = req.body.language;
    const age = req.body.age;
    const gender = req.body.gender;
    const job = req.body.job;
    const career = req.body.career;
    const user = req.decoded.id;

    try {
      const userInfo = await this.authService.userInfoUpdate(
        language,
        age,
        gender,
        job,
        career,
        user
      );

      return res
        .status(200)
        .json({ success: 'ok', message: '유저 정보 수정 성공' });
    } catch (error) {
      return next(error);
    }
  };

  getActivity = async (req, res, next) => {
    const user = req.decoded.name;

    try {
      const userActivity = await this.authService.getUserActivity(user);

      return res.status(200).json({
        Activity: userActivity,
      });
    } catch (error) {
      return next(error);
    }
  };
}
