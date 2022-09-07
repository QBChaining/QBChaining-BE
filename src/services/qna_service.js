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
  CreateQna = async (title, content, category, tags, user_id, user_name) => {
    if (!title || !content || !category) {
      throw new ConflictException(`null 값이 존재합니다.`);
    }

    const qnaTag = [];
    const qna = await Qna.create({ title, content, category, user_id });
    for (const tag of tags) {
      const tagdata = await QnaTag.create({ qna_id: qna.id, tag });
      qnaTag.push(tagdata.tag);
    }

    return {
      is_resolve: qna.is_resolve,
      id: qna.id,
      title: qna.title,
      content: qna.content,
      category: qna.category,
      updatedAt: qna.updatedAt,
      honey_tip: 0,
      qnaTag,
      user_name,
    };
  };

  FindAllQna = async (user_id) => {
    const qnaLists = await Qna.findAll({
      attributes: ['id', 'title', 'is_resolve', 'createdAt', 'category'],
      include: [
        { model: User, attributes: ['id', 'user_name'] },
        { model: QnaComment, attributes: ['id'] },
        { model: QnaTag, attributes: ['tag'], raw: true },
        { model: QnaLike, attributes: ['id', 'user_id'] },
        { model: QnaBookmark, attributes: ['user_id'] },
      ],
    });
    qnaLists.reverse();

    return qnaLists.map((list) => {
      const tag = [];

      for (let i = 0; i < list.QnaTags.length; i++) {
        tag.push(list.QnaTags[i]?.tag);
      }

      return {
        id: list.id,
        title: list.title,
        // content: list.content,
        is_resolve: list.is_resolve,
        createdAt: list.createdAt,
        honey_tip: list.QnaLikes.length,
        is_honey_tip: list.QnaLikes[0]?.user_id === user_id,
        is_bookmark: list.QnaBookmarks[0]?.user_id === user_id,
        cntcomment: list.QnaComments.length,
        category: list.category,
        tag,
        user: list.User,
      };
    });
  };

  FindOneQna = async (id, user_id) => {
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
        { model: QnaLike, attributes: ['id', 'user_id', 'qna_id'] },
      ],
    });
    const tag = [];
    for (let i = 0; i < lists.QnaTags?.length; i++)
      tag.push(lists.QnaTags[i]?.dataValues.tag);

    let is_honey_tip = false;
    for (let i = 0; i < lists.QnaLikes?.length; i++)
      if (lists.QnaLikes[i].user_id === user_id) is_honey_tip = true;

    return {
      id: lists.id,
      title: lists.title,
      content: lists.content,
      is_resolve: lists.is_resolve,
      honey_tip: lists.QnaLikes.length,
      is_honey_tip,
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
