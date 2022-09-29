import Language from '../models/language.js';
import AuthRepository from '../repositories/auth.repository.js';
import { ForbiddenException } from '../exception/customException.js';
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

  getUserActivity = async (userName) => {
    const twentySevenDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );

    const lastDate = new Date(
      twentySevenDaysAgo.setDate(twentySevenDaysAgo.getDate() + 1)
    )
      .toISOString()
      .slice(0, 10);

    const posts = await this.authRepository.findPostBetweenDays(userName);

    const postArray = posts.map((e) => {
      let id = e.dataValues.id;
      let updatedAt = e.dataValues.updatedAt.slice(0, 10);
      return { post: id, date: updatedAt };
    });

    const postComments = await this.authRepository.findPostCommentBetweenDays(
      userName
    );

    const postCommentArray = postComments.map((e) => {
      let id = e.dataValues.id;
      let updatedAt = e.dataValues.updatedAt.slice(0, 10);
      return { postComment: id, date: updatedAt };
    });

    const qnas = await this.authRepository.findQnaBetweenDays(userName);

    const qnaArray = qnas.map((e) => {
      let id = e.dataValues.id;
      let updatedAt = e.dataValues.updatedAt.slice(0, 10);
      return { qna: id, date: updatedAt };
    });

    const qnaComments = await this.authRepository.findQnaCommentBetweenDays(
      userName
    );

    const qnaCommentArray = qnaComments.map((e) => {
      let id = e.dataValues.id;
      let updatedAt = e.dataValues.updatedAt.slice(0, 10);
      return { qnaComment: id, date: updatedAt };
    });

    const combinedArray = postArray.concat(
      postCommentArray,
      qnaArray,
      qnaCommentArray
    );

    const sortedArray = combinedArray.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    let index = 0;
    let dateIndex = 0;
    let userActivity = [];
    let todayActivity = [];

    while (dateIndex < 30) {
      let date = new Date(new Date().setDate(new Date().getDate() - dateIndex))
        .toISOString()
        .slice(0, 10);

      let compareDate = sortedArray[index] ? sortedArray[index].date : false;

      if (date == compareDate) {
        todayActivity.push(sortedArray[index]);
        index++;
        if (date == lastDate) {
          userActivity.push(todayActivity);
        }
      } else {
        userActivity.push(todayActivity);
        todayActivity = [];
        dateIndex++;
      }
    }

    return userActivity.reverse();
  };

  getUserPage = async (userName) => {
    const user = await this.authRepository.findUserByName(userName);
    if (user.isNew === true)
      return { userName: user.userName, profileImg: user.profileImg };

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
