import User from '../models/user.js';
import UserInfo from '../models/user.info.js';
import Language from '../models/language.js';
import AuthRepository from '../repositories/auth.repository.js';

export default class AuthService {
  authRepository = new AuthRepository();

  userUpdate = async (userId) => {
    const user = await this.authRepository.updateUserById(userId);
    return user;
  };

  userInfoCreate = async (language, age, gender, job, career, userId) => {
    const user = await this.authRepository.findUserById(userId);
    const userLanguage = await this.authRepository.findLanguageById(userId);
    const userInfo = await this.authRepository.findUserInfoByID(userId);

    if (userInfo) {
      return {};
    } else {
      await this.authRepository.createUserInfo(
        age,
        gender,
        job,
        career,
        userId
      );
    }

    if (userLanguage.length > 0) {
      return {};
    } else {
      const lanArr = await Promise.all(
        language.map((e) => {
          return Language.create({ language: e });
        })
      );

      await user.addLanguages(lanArr);
    }

    return {};
  };

  userInfoUpdate = async (language, age, gender, job, career, userId) => {
    const findUserInfo = await UserInfo.findOne({
      where: {
        userId,
      },
    });

    if (findUserInfo) {
      await UserInfo.update(
        {
          isNew: 'false',
          age,
          gender,
          job,
          career,
        },
        { where: { userId } }
      );
    } else {
      console.log('NO USER FOUND');
    }

    const findUser = await User.findOne({
      where: { id: user },
    });

    const userLanguages = await findUser.getLanguages();
    const userJobs = await findUser.getJobs();

    // 기존의 언어/직업을 찾고
    // 기존의 언어/직업을 새로운 언어/직업으로 업데이트

    if (userLanguages.length > 0 && userJobs.length > 0) {
      const lanArr = await Promise.all(
        language.map((e) => {
          return Language.create({ language: e });
        })
      );

      await findUser.setLanguages(lanArr);
      await Language.destroy({ where: { userId: null } });
    } else {
      console.log('NO USER 정보 FOUND');
    }

    return {};
  };

  getUserActivity = async (userName) => {
    const findUser = await this.authRepository.findUserByName(userName);
    const posts = await findUser.getPosts();
    const qnas = await findUser.getQnas();

    const postArr = posts.map((e) => {
      let type = 'post';
      let date = e.dataValues.updatedAt;
      return { type, date };
    });

    const qnaArr = qnas.map((e) => {
      let type = 'qna';
      let date = e.dataValues.updatedAt;
      return { type, date };
    });

    const sumArr = postArr.concat(qnaArr);

    return sumArr;
  };
}
