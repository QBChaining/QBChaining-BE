import User from '../models/user.js';
import UserInfo from '../models/user.info.js';
import Language from '../models/language.js';
import Post from '../models/post.js';
import PostComment from '../models/post.comment.js';
import Qna from '../models/qna.js';
import QnaComment from '../models/qna.comment.js';
import { Op } from 'sequelize';

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

  createUserInfo = async (age, gender, career, job, userId) => {
    const userInfo = await UserInfo.create({
      age,
      gender,
      career,
      job,
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

  updateUserInfoById = async (age, gender, job, career, userId) => {
    await UserInfo.update(
      {
        age,
        gender,
        job,
        career,
      },
      { where: { userId } }
    );
    console.log('ok');
    return;
  };

  findLanguageById = async (userId) => {
    const language = await Language.findAll({ where: { userId } });

    return language;
  };

  findPostBetweenDays = async (twentySevenDaysAgo, today) => {
    const posts = await Post.findAll({
      where: {
        updatedAt: {
          [Op.between]: [twentySevenDaysAgo, today],
        },
      },
    });

    return posts;
  };

  findPostCommentBetweenDays = async (twentySevenDaysAgo, today) => {
    const postComments = await PostComment.findAll({
      where: {
        updatedAt: {
          [Op.between]: [twentySevenDaysAgo, today],
        },
      },
    });

    return postComments;
  };

  findQnaBetweenDays = async () => {};
  findQnaCommentBetweenDays = async () => {};

  findAllUserActivityBetweenDates = async (
    userName,
    twentySevenDaysAgo,
    today
  ) => {
    const userData = await User.findOne({
      where: {
        userName,
        updatedAt: {
          [Op.between]: [twentySevenDaysAgo, today],
        },
      },
      include: ['Posts', 'PostComments'],
    });

    return userData;
  };
}
