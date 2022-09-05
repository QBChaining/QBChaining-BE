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

class QnaService {
  CreateQna = async (title, content, category, tags, user_id) => {
    if (!title || !content || !category) {
      throw new ConflictException(`null 값이 존재합니다.`);
    }

    await Qna.create({ title, content, category, user_id });
    for (const tag of tags) {
      await QnaTag.create({ qna_id, tag });
    }
  };

  FindAllQna = async () => {
    const qnaLists = await Qna.findAll({
      attributes: ['id', 'title', 'is_resolve', 'createdAt', 'category'],
      include: [
        { model: User, attributes: ['id', 'user_name'] },
        { model: QnaComment, attributes: ['id'] },
        { model: QnaTag, attributes: ['tag'], raw: true },
        { model: QnaLike, attributes: ['id'] },
      ],
    });
    qnaLists.reverse();
    return qnaLists.map((list) => {
      const tag = [];
      for (let i = 0; i < list.QnaTags.length; i++) {
        tag.push(list.QnaTags[i].dataValues.tag);
      }
      return {
        id: list.id,
        title: list.title,
        // content: list.content,
        is_resolve: list.is_resolve,
        createdAt: list.createdAt,
        honey_tip: list.QnaLikes.length,
        cntcomment: list.QnaComments.length,
        category: list.category,
        tag,
        user: list.User,
      };
    });
  };

  FindOneQna = async (id) => {
    const lists = await Qna.findOne({
      where: { id },
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'is_resolve',
        'createdAt',
      ],
      include: [
        { model: User, attributes: ['id', 'user_name'] },
        { model: QnaTag, attributes: ['tag'], raw: true },
        { model: QnaLike, attributes: ['id'] },
      ],
    });
    const tag = [];
    for (let i = 0; i < lists.QnaTags.length; i++)
      tag.push(lists.QnaTags[i].dataValues.tag);

    return {
      id: lists.id,
      title: lists.title,
      content: lists.content,
      is_resolve: lists.is_resolve,
      honey_tip: lists.QnaLikes.length,
      createdAt: lists.createdAt,
      category: lists.category,
      tag,
      user: lists.User,
    };
  };

  AddBookMark = async (qna_id, user_id) => {
    const existLike = await QnaBookmark.findOne({ where: { qna_id, user_id } });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaBookmark.create({ qna_id, user_id });
  };

  RemoveBookMark = async (qna_id, user_id) => {
    const existLike = await QnaBookmark.findOne({ where: { qna_id, user_id } });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaBookmark.destroy({ where: { qna_id, user_id } });
  };

  LikeQna = async (qna_id, user_id) => {
    const existLike = await QnaLike.findOne({ where: { qna_id, user_id } });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaLike.create({ qna_id, user_id });
  };

  RemoveLikeQna = async (qna_id, user_id) => {
    const existLike = await QnaLike.findOne({ where: { qna_id, user_id } });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaLike.destroy({ where: { qna_id, user_id } });
  };

  FindBookMark = async (user_id) => {
    const bookmarkLists = await QnaBookmark.findAll({
      where: { user_id },
      attributes: ['qna_id'],
      include: [{ model: Qna, attributes: ['title'] }],
    });
    return bookmarkLists;
  };
}

export default QnaService;
