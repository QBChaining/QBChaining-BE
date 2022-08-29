import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customexception.js';

import Qna from '../models/qna.js';
import QnaTag from '../models/qna_tag.js';
import User from '../models/user.js';

class QnaService {
  createQna = async (title, content, language, rowtag, user_id) => {
    if ((!title || !content, !language)) {
      throw new ConflictException(`null 값이 존재합니다.`);
    }
    const result = await Qna.create({ title, content, language });
    // await QnaTag  >>> Pending
  };

  findAllQna = async () => {
    const qnaLists = await Qna.findAll({
      include: [{ model: User }],
    });
    // pending
    // 추천수 ( DB x )
    // 댓글수 ( DB x )
    // User 정보
    // tag 정보
    if (1) throw Error(`알 수 없는 에러 처리`);
    return qnaLists;
  };
}

export default QnaService;
