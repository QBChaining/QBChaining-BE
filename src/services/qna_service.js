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
import QnaComment from '../models/qna_comment.js';
import QnaTag from '../models/qna_tag.js';
import User from '../models/user.js';
import QnaLike from '../models/qna_like.js';

class QnaService {
  CreateQna = async (title, content, category, tags, qna_id) => {
    if ((!title || !content, !category)) {
      throw new ConflictException(`null 값이 존재합니다.`);
    }
    const result = await Qna.create({ title, content, category, user_id: 1 });

    for (const tag of tags) {
      await QnaTag.create({ user_id: 1, tag });
    }

    // await QnaTag  >>> Pending
  };

  FindAllQna = async () => {
    const qnaLists = await Qna.findAll({
      // attributes: ['id', 'title', 'is_resolve'],
      include: [
        { model: User, attributes: ['id', 'user_name', 'createdAt'] },
        { model: QnaComment, attributes: ['id'] },
        { model: QnaTag, attributes: ['tag'], raw: true },
        { model: QnaLike, attributes: ['id'] },
      ],
    });
    return qnaLists.map((list) => {
      const tag = [];
      for (let i = 0; i < list.QnaTags.length; i++) {
        tag.push(list.QnaTags[i].dataValues.tag);
      }
      return {
        id: list.id,
        title: list.title,
        content: list.content,
        is_resolve: list.is_resolve,
        createdAt: list.createdAt,
        honey_tip: list.QnaLikes?.length,
        cntcomment: list.QnaComments?.length,
        category: list.category,
        tag,
        user: list.User,
      };
    });
  };

  FindOneQna = async (id) => {
    const lists = await Qna.findOne({
      wherer: { id },
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'is_resolve',
        'createdAt',
      ],
      include: [
        {
          model: QnaComment,
          attributes: ['id', 'comment', 'is_choose', 'user_name', 'createdAt'],
        },
      ],
    });

    return lists;
  };

  AddBookMark = async (qna_id, user_id) => {
    const existLike = await QnaLike.findOne({ where: { qna_id, user_id } });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaLike.create({ qna_id, user_id });
  };

  RemoveBookMark = async (qna_id, user_id) => {
    const existLike = await QnaLike.findOne({ where: { qna_id, user_id } });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaLike.destroy({ where: { qna_id, user_id } });
  };
}

export default QnaService;
