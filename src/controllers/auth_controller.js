import passport from 'passport';
import AuthService from '../services/authService';

class AuthController {
  kakao = async (req, res) => {
    await passport.authenticate('kakao')(req, res);
  };
}
module.exports = AuthController;
