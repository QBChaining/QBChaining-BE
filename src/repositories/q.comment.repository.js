import Qna from '../models/qna.js';
import QnaComment from '../models/qna.comment.js';
import QnaCommentLike from '../models/qna.comment.like.js';
import User from '../models/user.js';
import QnaBookmark from '../models/qna.bookmark.js';
import Notification from '../models/noti.js';
import sequelize from 'sequelize';

const option = sequelize.Op;

export default class QnaCommentRepository {
  FindQna = async (qnaId) => {
    return await Qna.findByPk(qnaId);
  };

  CreateComment = async (qnaId, userName, comment) => {
    return await QnaComment.create({ qnaId, userName, comment });
  };
  Getchoose = async (qnaId, userName) => {
    return await QnaComment.findOne({
      where: { qnaId, isChoose: true },
      attributes: { exclude: ['qnaId', 'updatedAt'] },
      include: [
        { model: User, attributes: ['profileImg'] },
        {
          model: QnaCommentLike,
          attributes: ['userName'],
          where: { userName: { [option.eq]: `${userName}` } },
          required: false,
        },
      ],
    });
  };
  GetQnaComment = async (qnaId, page_count, page, userName) => {
    return await QnaComment.findAll({
      where: { qnaId },

      offset: page_count * page,
      limit: page_count,
      attributes: {
        exclude: ['updatedAt', 'qnaId'],
      },
      include: [
        {
          model: QnaCommentLike,
          attributes: ['userName'],
          where: { userName: { [option.eq]: `${userName}` } },
          required: false,
        },
        { model: User, attributes: ['profileImg'] },
      ],
      order: [['isChoose', 'DESC']],
    });
  };
  FindQnaLike = async (qnaCommentId, userName) => {
    return await QnaCommentLike.findOne({
      where: { qnaCommentId, userName },
    });
  };

  LikeQna = async (qnaCommentId, userName) => {
    await QnaCommentLike.create({ qnaCommentId, userName });
    await QnaComment.increment({ likes: 1 }, { where: { id: qnaCommentId } });
  };

  RemoveLikeQna = async (qnaCommentId, userName) => {
    await QnaCommentLike.destroy({ where: { qnaCommentId, userName } });
    await QnaComment.increment({ likes: -1 }, { where: { id: qnaCommentId } });
  };

  FindComment = async (qnaCommentId) => {
    return await QnaComment.findByPk(qnaCommentId);
  };

  UpdateStatusQna = async (id) => {
    await Qna.update({ isResolve: true }, { where: { id } });
  };

  UpdateStatusComment = async (id) => {
    await QnaComment.update({ isChoose: true }, { where: { id } });
  };

  QnaCommentBookmark = async (qnaid) => {
    return await QnaBookmark.findAll({
      where: { qnaid: qnaid },
    });
  };

  Notification = async (qna) => {
    const notification = await Notification.create({
      type: 'qna',
      check: false,
      qnaId: qna.id,
      userName: qna.userName,
    });

    return notification;
  };

  CreateNoti = async (notiqna, notiname) => {
    const notification = await Notification.create({
      type: 'qna',
      check: false,
      qnaId: notiqna,
      userName: notiname,
    });
  };
}
