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
    const user = await this.authRepository.findUserById(userId);
    const userInfo = await this.authRepository.findUserInfoByID(userId);

    if (userInfo) {
      await this.authRepository.updateUserInfoById(
        age,
        gender,
        job,
        career,
        userId
      );
    } else {
      console.log('NO USER FOUND');
    }

    const userLanguages = await this.authRepository.findLanguageById(userId);

    // 기존의 언어/직업을 찾고
    // 기존의 언어/직업을 새로운 언어/직업으로 업데이트

    if (userLanguages.length > 0) {
      const lanArr = await Promise.all(
        language.map((e) => {
          return Language.create({ language: e });
        })
      );

      await user.setLanguages(lanArr);
      await Language.destroy({ where: { userId: null } });
    } else {
      console.log('NO USER 정보 FOUND');
    }

    return {};
  };

  /* 

    오늘을 기준으로 30일 동안의 사용자 활동

    출력 예시 : 

    [
      [
        {type : post, date : 2022-09-30}, 
        {type : post, date : 2022-09-30}, 
        {type : post, date : 2022-09-30},
      ],
      [
        {type : post, date : 2022-09-29}, 
        {type : post, date : 2022-09-29}, 
        {type : post, date : 2022-09-29},
      ]
    ]

  */
  getUserActivity = async (userName) => {
    const findUser = await this.authRepository.findUserByName(userName);
    const posts = await findUser.getPosts();
    // const qnas = await findUser.getQnas();

    // const postArr = posts.map((e) => {
    //   let type = 'post';
    //   let date = e.dataValues.updatedAt;
    //   return { type, date };
    // });

    // const qnaArr = qnas.map((e) => {
    //   let type = 'qna';
    //   let date = e.dataValues.updatedAt;
    //   return { type, date };
    // });

    // const sumArr = postArr.concat(qnaArr);

    return {};
  };

  getUserPage = async (userName) => {
    const user = await this.authRepository.findUserByName(userName);
    const name = user.userName;
    const profileImg = user.profileImg;
    const age = user.age;
    const gender = user.gender;
    const job = user.job;
    const career = user.career;
    const language = await user.getLanguages();
    const languages = language.map((e) => {
      return e.dataValues.language;
    });

    return { name, profileImg, age, gender, job, career, languages };
  };
}
