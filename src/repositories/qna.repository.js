import Qna from '../models/qna.js';
import QnaComment from '../models/qna.comment.js';

import User from '../models/user.js';
import QnaLike from '../models/qna.like.js';
import QnaBookmark from '../models/qna.bookmark.js';
import sequelize from 'sequelize';

const option = sequelize.Op;

export default class QnaRepository {
  CreateQna = async (title, content, category, userName, tags) => {
    return await Qna.create({ title, content, category, userName, tags });
  };

  GetAllQna = async (userName, page_count, page, status) => {
    return await Qna.findAll({
      where: {
        isResolve: status,
      },

      offset: page_count * page,
      limit: page_count,
      attributes: [
        'id',
        'title',
        'isResolve',
        'createdAt',
        'category',
        'userName',
        'tags',
        'like',
      ],

      include: [
        {
          model: User,
          attributes: ['profileImg'],
        },

        {
          model: QnaComment,
          attributes: ['id'],
        },

        {
          model: QnaLike,
          attributes: ['userName'],
          where: { userName: { [option.eq]: `${userName}` } },
          required: false,
        },

        {
          model: QnaBookmark,
          attributes: ['userName'],
          where: { userName: { [option.eq]: `${userName}` } },
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  };

  GetHotQna = async () => {
    return await Qna.findAll({
      limit: 5,
      where: {
        createdAt: {
          [option.lt]: new Date(),
          [option.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
      attributes: [
        'id',
        'title',
        'category',
        'isResolve',
        'createdAt',
        'userName',
        'tags',
      ],
      include: [
        {
          model: QnaLike,
          attributes: ['userName'],
        },
      ],
    });
  };

  GetOneQna = async (id, userName) => {
    return await Qna.findOne({
      raw: true,
      where: { id },
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'isResolve',
        'createdAt',
        'userName',
        'tags',
        'like',
      ],
      include: [
        { model: User, attributes: ['profileImg'] },
        {
          model: QnaLike,
          attributes: ['userName'],
          where: { userName },
          required: false,
        },
        {
          model: QnaBookmark,
          attributes: ['userName'],
          where: { userName },
          required: false,
        },
      ],
    });
  };

  FindBookMark = async (qnaId, userName) => {
    return await QnaBookmark.findOne({
      where: { qnaId, userName },
    });
  };

  AddBookMark = async (qnaId, userName) => {
    await QnaBookmark.create({ qnaId, userName });
  };

  RemoveBookMark = async (qnaId, userName) => {
    await QnaBookmark.destroy({ where: { qnaId, userName } });
  };

  GetUserBookmark = async (userName, page, page_count) => {
    return await QnaBookmark.findAll({
      offset: page * page_count,
      limit: page_count,
      where: { userName },
      attributes: [],
      include: [
        { model: Qna, attributes: ['id', 'title', 'createdAt', 'userName'] },
      ],
      order: [[Qna, 'createdAt', 'DESC']],
    });
  };
  FindQnaLike = async (qnaId, userName) => {
    return await QnaLike.findOne({
      where: { qnaId, userName },
    });
  };

  LikeQna = async (qnaId, userName) => {
    await QnaLike.create({ qnaId, userName });
    await Qna.increment({ like: 1 }, { where: { id: qnaId } });
  };

  RemoveLikeQna = async (qnaId, userName) => {
    await QnaLike.destroy({ where: { qnaId, userName } });
    await Qna.increment({ like: -1 }, { where: { id: qnaId } });
  };

  GetQnaCategory = async (category, page, page_count, userName, status) => {
    return await Qna.findAll({
      where: {
        category,
        isResolve: status,
      },
      offset: page_count * page,
      limit: page_count,
      attributes: [
        'id',
        'title',
        'isResolve',
        'createdAt',
        'category',
        'userName',
        'tags',
        'like',
      ],

      include: [
        { model: User, attributes: ['profileImg'] },

        {
          model: QnaComment,
          attributes: ['id'],
        },

        {
          model: QnaLike,
          attributes: ['userName'],
          where: { userName: { [option.eq]: `${userName}` } },
          required: false,
        },

        {
          model: QnaBookmark,
          attributes: ['userName'],
          where: { userName: { [option.eq]: `${userName}` } },
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  };

  GetUserQna = async (userName) => {
    return await User.findAll({
      where: { userName },
      attributes: [],
      include: [
        { model: Qna, attributes: ['id', 'title', 'createdAt', 'isResolve'] },
        {
          model: QnaComment,
          attributes: ['id'],
          include: [
            {
              model: Qna,
              where: { userName: { [option.not]: userName } },
              attributes: ['id', 'title', 'isResolve', 'createdAt', 'userName'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  };
}
