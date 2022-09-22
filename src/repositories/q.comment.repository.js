import Qna from '../models/qna.js';
import QnaComment from '../models/qna.comment.js';
import QnaCommentLike from '../models/qna.comment.like.js';
import User from '../models/user.js';
import QnaBookmark from '../models/qna.bookmark.js';

export default class QnaCommentRepository {
  FindQna = async (qnaId) => {
    return await Qna.findByPk(qnaId);
  };

  CreateComment = async (qnaId, userName, comment) => {
    return await QnaComment.create({ qnaId, userName, comment });
  };

  GetQnaComment = async (qnaId, page_count, page) => {
    return await QnaComment.findAll({
      where: { qnaId },
      offset: page_count * page,
      limit: page_count,
      attributes: {
        include: ['id', 'comment', 'isChoose', 'createdAt', 'userName'],
      },
      include: [
        { model: QnaCommentLike, attributes: ['userName'] },
        { model: User, attributes: ['profileImg'] },
      ],
    });
  };
}
