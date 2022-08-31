import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

import Qna from '../models/qna.js';
import QnaComment from '../models/qna_comment.js';
import QnaTag from '../models/qna_tag.js';
import User from '../models/user.js';
import QnaLike from '../models/qna_like.js';
import QnaBookmark from '../models/qna_bookmark.js';
import QnaCommentLike from '../models/qna_comment_like.js';

class QnaCommentService {
  CreateQnaComment = async (qna_id, user_name, comment) => {
    if (!comment) throw ConflictException('내용 입력은 필수');
    console.log(qna_id, user_name, comment);
    const existQna = await Qna.findOne({ where: { id: qna_id } });
    if (!existQna) throw NotFoundException('게시물이 존재 하지 않음');

    await QnaComment.create({ qna_id, user_name, comment });
  };

  FindAllComment = async (qna_id) => {
    const commentLists = await QnaComment.findAll({
      attributes: ['id', 'comment', 'is_choose', 'user_name', 'createdAt'],
      where: { qna_id },
      include: [{ model: QnaCommentLike }],
    });

    return commentLists
      .map((list) => {
        return {
          id: list.id,
          comment: list.comment,
          is_choose: list.is_choose,
          user_name: list.user_name,
          createdAt: list.createdAt,
          honey_tip: list.QnaCommentLikes.length,
        };
      })
      .sort((a, b) => {
        a = a.honey_tip;
        b = b.honey_tip;
        return b - a;
      });
  };
}

export default QnaCommentService;
