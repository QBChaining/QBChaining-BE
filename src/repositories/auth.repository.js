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

  createUserInfo = async (age, gender, job, career, userId) => {
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
    return;
  };

  findLanguageById = async (userId) => {
    const language = await Language.findAll({ where: { userId } });

    return language;
  };

  findPostBetweenDays = async (userName) => {
    const today = new Date();
    const twentySevenDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    const posts = await Post.findAll({
      where: {
        userName,
        updatedAt: {
          [Op.between]: [twentySevenDaysAgo, today],
        },
      },
    });

    return posts;
  };

  findPostCommentBetweenDays = async (userName) => {
    const today = new Date();
    const twentySevenDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    const postComments = await PostComment.findAll({
      where: {
        userName,
        updatedAt: {
          [Op.between]: [twentySevenDaysAgo, today],
        },
      },
    });

    return postComments;
  };

  findQnaBetweenDays = async (userName) => {
    const today = new Date();
    const twentySevenDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    const qna = await Qna.findAll({
      where: {
        userName,
        updatedAt: {
          [Op.between]: [twentySevenDaysAgo, today],
        },
      },
    });

    return qna;
  };

  findQnaCommentBetweenDays = async (userName) => {
    const today = new Date();
    const twentySevenDaysAgo = new Date(
      new Date().setDate(new Date().getDate() - 30)
    );
    const qnaComments = await QnaComment.findAll({
      where: {
        userName,
        updatedAt: {
          [Op.between]: [twentySevenDaysAgo, today],
        },
      },
    });

    return qnaComments;
  };
}
