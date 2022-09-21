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

  GetAllQnaCompletion = async (userName, page_count, page) => {
    return await Qna.findAll({
      where: {
        isResolve: { [Op.eq]: true },
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
  GetAllIncompletion = async (userName, page_count, page) => {
    return await Qna.findAll({
      where: {
        isResolve: { [Op.eq]: false },
      },
      order: [['createdAt', 'DESC']],
      offset: page_count * page,
      limit: page_count,
      attributes: [
        'id',
        'title',
        'isResolve',
        'createdAt',
        'category',
        'userName',
      ],
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: QnaComment, attributes: ['id'] },

        { model: QnaLike, attributes: ['userName'] },
        { model: QnaBookmark, attributes: ['userName'] },
      ],
    });
  };
}
