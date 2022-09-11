import User from '../models/user.js';

export default class AuthService {
  infoUpdate = async (user_id) => {
    await User.update({ is_new: 'false' }, { where: { id: user_id } });
    const user = User.findOne({ where: { id: user_id } });
    return user;
  };

  userInfoCreate = async (language, age, gender, jobs, career) => {};
}
