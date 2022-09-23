import User from '../models/user.js';
import UserInfo from '../models/user.info.js';
import Language from '../models/language.js';
import AuthRepository from '../repositories/auth.repository.js';
import { Op } from 'sequelize';

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
      return;
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
      return;
    } else {
      const lanArr = await Promise.all(
        language.map((e) => {
          return Language.create({ language: e });
        })
      );

      await user.addLanguages(lanArr);
    }

    return;
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

    오늘을 기준으로 27일 동안의 사용자 활동

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
    const date = new Date();
    const today = new Date(date.setDate(date.getDate() + 1));
    const twentySevenDaysAgo = new Date(date.setDate(date.getDate() - 26));

    const posts = await this.authRepository.findPostBetweenDays(
      twentySevenDaysAgo,
      today
    );

    const postArray = posts.map((e) => {
      let id = e.dataValues.id;
      let updatedAt = e.dataValues.updatedAt.slice(0, 10);
      return { post: id, date: updatedAt };
    });

    const postComments = await this.authRepository.findPostCommentBetweenDays(
      twentySevenDaysAgo,
      today
    );

    const postCommentArray = postComments.map((e) => {
      let id = e.dataValues.id;
      let updatedAt = e.dataValues.updatedAt.slice(0, 10);
      return { postComment: id, date: updatedAt };
    });

    const combinedArray = postArray.concat(postCommentArray);

    const sortedArray = combinedArray.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    const activity = [];
    let theArray = [];
    let theDate = sortedArray[0].date;

    for (let i = 0; i < sortedArray.length; i++) {
      if (theDate == sortedArray[i].date) {
        theArray.push(sortedArray[i]);
      } else {
        theDate = sortedArray[i].date;
        activity.push(theArray);
        theArray = [];
        theArray.push(sortedArray[i]);
      }
    }

    return activity;
  };

  getUserPage = async (userName) => {
    const user = await this.authRepository.findUserByName(userName);
    const userInfo = await this.authRepository.findUserInfoByID(user.id);
    const name = user.userName;
    const profileImg = user.profileImg;
    const age = userInfo.age;
    const gender = userInfo.gender;
    const job = userInfo.job;
    const career = userInfo.career;
    const language = await user.getLanguages();
    const languages = language.map((e) => {
      return e.dataValues.language;
    });

    return { name, profileImg, age, gender, job, career, languages };
  };
}
