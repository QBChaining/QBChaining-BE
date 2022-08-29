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

class QnaService {
  createQna = async (title, content, language, rowtag, user_id) => {
    if ((!title || !content, !language)) {
      throw new ConflictException(`null 값이 존재합니다.`);
    }
    const result = await Qna.create({ title, content, language });
    // await QnaTag  >>> Pending
  };
}

export default QnaService;
