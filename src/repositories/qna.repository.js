import Qna from '../models/qna.js';
import QnaComment from '../models/qna.comment.js';

import User from '../models/user.js';
import QnaLike from '../models/qna.like.js';
import QnaBookmark from '../models/qna.bookmark.js';
import sequelize from 'sequelize';

const Op = sequelize.Op;

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
        },

        {
          model: QnaBookmark,
          attributes: ['userName'],
          where: { userName: { [Op.eq]: `${userName}` } },
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  };

  GetOneQna = async (id) => {
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
      ],
      include: [
        { model: User, attributes: ['profileImg'] },
        {
          model: QnaLike,
          attributes: [[sequelize.fn('COUNT', 'id'), 'like'], 'userName'],
        },
        {
          model: QnaBookmark,
          attributes: ['userName'],
        },
      ],
    });
  };

  FindBookMark = async (qnaId, userName) => {
    return await QnaBookmark.findOne({
      where: { qnaId, userName },
    });
  };

  AddBookMark = (qnaId, userName) => {
    QnaBookmark.create({ qnaId, userName });
  };

  RemoveBookMark = (qnaId, userName) => {
    QnaBookmark.destroy({ where: { qnaId, userName } });
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

  LikeQna = (qnaId, userName) => {
    QnaLike.create({ qnaId, userName });
  };

  RemoveLikeQna = (qnaId, userName) => {
    QnaLike.destroy({ where: { qnaId, userName } });
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
        },

        {
          model: QnaBookmark,
          attributes: ['userName'],
          where: { userName: { [Op.eq]: `${userName}` } },
          required: false,
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [QnaLike, 'userName', 'DESC'],
      ],
    });
  };

  GetUserQna = async (userName) => {
    return await Qna.findAll({
      where: { userName },
      attributes: ['id', 'title', 'isResolve', 'createdAt'],
      order: ['createdAt', 'DESC'],
    });
  };
}
