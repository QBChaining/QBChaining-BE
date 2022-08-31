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

class QnaCommentService {
  CreateQnaComment = async (qna_id, user_name, comment) => {
    if (!comment) throw ConflictException('내용 입력은 필수');
    console.log(qna_id, user_name, comment);
    const existQna = await Qna.findOne({ where: { id: qna_id } });
    if (!existQna) throw NotFoundException('게시물이 존재 하지 않음');

    await QnaComment.create({ qna_id, user_name, comment });
  };
}

export default QnaCommentService;
