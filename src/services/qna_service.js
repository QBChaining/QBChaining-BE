import {
  CustomException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
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
  CreateQna = async (title, content, category, tags, user_name) => {
    if (!title || !content || !category || tags.length > 5) {
      throw new BadRequestException(`입력값이 없거나 잘못 되었습니다.`);
    }

    const qnaTag = [];
    const qna = await Qna.create({ title, content, category, user_name });
    for (const tag of tags) {
      const tagdata = await QnaTag.create({ qna_id: qna.id, tag });
      qnaTag.push(tagdata.tag);
    }

    return {
      is_resolve: qna.is_resolve,
      id: qna.id,
      user_name: qna.user_name,
      title: qna.title,
      content: qna.content,
      category: qna.category,
      updatedAt: qna.updatedAt,
      honey_tip: 0,
      qnaTag,
    };
  };

  FindAllQna = async (user_name, page_count, page) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const qnaLists = await Qna.findAll({
      order: [['createdAt', 'DESC']],
      offset: page_count * page,
      limit: page_count,
      attributes: [
        'id',
        'title',
        'is_resolve',
        'createdAt',
        'category',
        'user_name',
      ],
      include: [
        { model: User, attributes: ['profile_img'] },
        { model: QnaComment, attributes: ['id'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['user_name'] },
        { model: QnaBookmark, attributes: ['user_name'] },
      ],
    });

    return qnaLists.map((list) => {
      let tag = [];
      let is_bookmark = false;
      let is_honey_tip = false;
      for (let i = 0; i < list.QnaTags.length; i++) {
        tag.push(list.QnaTags[i]?.tag);
      }
      for (let i = 0; i < list.QnaBookmarks.length; i++) {
        if (list.QnaBookmarks[i]?.user_name === user_name) is_bookmark = true;
      }
      for (let i = 0; i < list.QnaLikes.length; i++) {
        if (list.QnaLikes[i]?.user_name === user_name) is_honey_tip = true;
      }

      return {
        id: list.id,
        title: list.title,
        user_name: list.user_name,
        profile_img: list.User.profile_img,
        is_resolve: list.is_resolve,
        createdAt: list.createdAt,
        honey_tip: list.QnaLikes.length,
        is_honey_tip,
        is_bookmark,
        cntcomment: list.QnaComments.length,
        category: list.category,
        tag,
      };
    });
  };

  FindOneQna = async (id, user_name) => {
    const lists = await Qna.findOne({
      where: { id },
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'is_resolve',
        'createdAt',
        'user_name',
      ],
      include: [
        { model: User, attributes: ['profile_img'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['user_name'] },
      ],
    });
    const tag = [];
    for (let i = 0; i < lists.QnaTags?.length; i++)
      tag.push(lists.QnaTags[i]?.dataValues.tag);

    let is_honey_tip = false;
    for (let i = 0; i < lists.QnaLikes?.length; i++)
      if (lists.QnaLikes[i].user_name === user_name) is_honey_tip = true;

    return {
      id: lists.id,
      title: lists.title,
      content: lists.content,
      user_name: lists.user_name,
      profile_img: lists.User.profile_img,
      is_resolve: lists.is_resolve,
      honey_tip: lists.QnaLikes.length,
      is_honey_tip,
      createdAt: lists.createdAt,
      category: lists.category,
      tag,
    };
  };

  AddBookMark = async (qna_id, user_name) => {
    const existLike = await QnaBookmark.findOne({
      where: { qna_id, user_name },
    });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaBookmark.create({ qna_id, user_name });
  };

  RemoveBookMark = async (qna_id, user_name) => {
    const existLike = await QnaBookmark.findOne({
      where: { qna_id, user_name },
    });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaBookmark.destroy({ where: { qna_id, user_name } });
  };

  LikeQna = async (qna_id, user_name) => {
    const existLike = await QnaLike.findOne({ where: { qna_id, user_name } });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaLike.create({ qna_id, user_name });
  };

  RemoveLikeQna = async (qna_id, user_name) => {
    const existLike = await QnaLike.findOne({ where: { qna_id, user_name } });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaLike.destroy({ where: { qna_id, user_name } });
  };

  FindBookMark = async (user_name, page, page_count) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const bookmarkLists = await QnaBookmark.findAll({
      offset: page * page_count,
      limit: page_count,
      where: { user_name },
      attributes: [],
      include: [
        { model: Qna, attributes: ['id', 'title', 'createdAt', 'user_name'] },
      ],
    });
    return bookmarkLists.map((list) => {
      return {
        id: list.Qna.id,
        title: list.Qna.title,
        createdAt: list.Qna.createdAt,
        user_name: list.Qna.user_name,
      };
    });
  };

  FindCategories = async (category, page, page_count, user_name) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const filterlists = await Qna.findAll({
      offset: page * page_count,
      limit: page_count,
      where: { category },
      attributes: {
        exclude: ['updatedAt', 'UserId', 'content'],
      },
      include: [
        { model: User, attributes: ['profile_img'] },
        { model: QnaComment, attributes: ['id'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['id', 'user_name'] },
        { model: QnaBookmark, attributes: ['user_name'] },
      ],
    });

    return filterlists.map((list) => {
      let tag = [];
      let is_bookmark = false;
      let is_honey_tip = false;
      for (let i = 0; i < list.QnaTags.length; i++) {
        tag.push(list.QnaTags[i]?.tag);
      }
      for (let i = 0; i < list.QnaBookmarks.length; i++) {
        if (list.QnaBookmarks[i]?.user_name === user_name) is_bookmark = true;
      }
      for (let i = 0; i < list.QnaLikes.length; i++) {
        if (list.QnaLikes[i]?.user_name === user_name) is_honey_tip = true;
      }

      return {
        id: list.id,
        title: list.title,
        profile_img: list.User.profile_img,
        user_name: list.user_name,
        honey_tip: list.QnaLikes.length,
        cntcomment: list.QnaComments.length,
        is_resolve: list.is_resolve,
        is_honey_tip,
        is_bookmark,
        category: list.category,
        createdAt: list.createdAt,
        tag,
      };
    });
  };

  FindUserQna = async (user_name, compare_id) => {
    const is_mine = user_name * 1 === compare_id;
    const qnalists = await Qna.findAll({
      where: { user_name },
      attributes: ['id', 'title', 'is_resolve', 'createdAt'],
    });
    return { is_mine, qnalists };
  };
}
export default QnaService;
