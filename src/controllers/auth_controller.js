import jwt from "jsonwebtoken";
import AuthService from "../services/auth_service.js";

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
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
          issuer: "jihun",
        }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  };
}
