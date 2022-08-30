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
  createQna = async (title, content, language, rowtag, qna_id) => {
    if ((!title || !content, !language)) {
      throw new ConflictException(`null 값이 존재합니다.`);
    }
    const result = await Qna.create({ title, content, language, user_id: 2 });

    for (const tag of rowtag) {
      await QnaTag.create({ qna_id: 2, tag });
    }

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

  updateQna = async (title, content, language, rowtag, id) => {
    if ((!title, !content, !language)) {
      throw new ConflictException(`null 값이 존재합니다.`);
    }
    // 유저 아이디 받아오기
    id = 1;
    const isDone = await Qna.update(
      { title, content, language },
      { where: { id } }
    );
  };
}

export default QnaService;
