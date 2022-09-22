import User from '../models/user.js';
import UserInfo from '../models/user.info.js';
import Language from '../models/language.js';

export default class AuthRepository {
  findUserByName = async (userName) => {
    const user = await User.findOne({
      where: { userName },
    });

    return user;
  };

  findUserById = async (userId) => {
    const user = await User.findOne({
      where: { id: userId },
    });

    return user;
  };

  updateUserById = async (userId) => {
    const user = await User.update(
      { isNew: 'false' },
      { where: { id: userId } }
    );

    return user;
  };

  createUserInfo = async (age, gender, career, userId) => {
    const userInfo = await UserInfo.create({
      age,
      gender,
      career,
      userId,
    });

    return userInfo;
  };

  findUserInfoByID = async (userId) => {
    const userInfo = await UserInfo.findOne({
      where: {
        userId,
      },
    });

    return userInfo;
  };

  findLanguageById = async (userId) => {
    const language = await Language.findAll({ where: { userId } });

    return language;
  };
}
