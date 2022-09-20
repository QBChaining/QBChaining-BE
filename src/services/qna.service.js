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
import QnaComment from '../models/qna.comment.js';
import QnaTag from '../models/qna.tag.js';
import User from '../models/user.js';
import QnaLike from '../models/qna.like.js';
import QnaBookmark from '../models/qna.bookmark.js';
import sequelize from 'sequelize';

const Op = sequelize.Op;

class QnaService {
  CreateQna = async (title, content, category, tags, userName) => {
    if (!title || !content || !category || tags.length > 5) {
      throw new BadRequestException(`입력값이 없거나 잘못 되었습니다.`);
    }

    const qnaTag = [];
    const qna = await Qna.create({ title, content, category, userName });
    for (const tag of tags) {
      const tagdata = await QnaTag.create({ qnaId: qna.id, tag });
      qnaTag.push(tagdata.tag);
    }

    return {
      isResolve: qna.isResolve,
      id: qna.id,
      userName: qna.userName,
      title: qna.title,
      content: qna.content,
      category: qna.category,
      updatedAt: qna.updatedAt,
      like: 0,
      qnaTag,
    };
  };

  GetAllQnaCompletion = async (userName, page_count, page) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const qnaLists = await Qna.findAll({
      where: {
        isResolve: { [Op.eq]: true },
      },
      order: [['createdAt', 'DESC']],
      offset: page_count * page,
      limit: page_count,
      attributes: [
        'id',
        'title',
        'isResolve',
        'createdAt',
        'category',
        'userName',
      ],
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: QnaComment, attributes: ['id'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['userName'] },
        { model: QnaBookmark, attributes: ['userName'] },
      ],
    });

    return qnaLists.map((list) => {
      let tag = [];
      let isBookmark = false;
      let isLike = false;
      for (let i = 0; i < list.QnaTags.length; i++) {
        tag.push(list.QnaTags[i]?.tag);
      }
      for (let i = 0; i < list.QnaBookmarks.length; i++) {
        if (list.QnaBookmarks[i]?.userName === userName) isBookmark = true;
      }
      for (let i = 0; i < list.QnaLikes.length; i++) {
        if (list.QnaLikes[i]?.userName === userName) isLike = true;
      }

      return {
        id: list.id,
        title: list.title,
        userName: list.userName,
        profileImg: list.User.profileImg,
        isResolve: list.isResolve,
        createdAt: list.createdAt,
        like: list.QnaLikes.length,
        isLike,
        isBookmark,
        cntcomment: list.QnaComments.length,
        category: list.category,
        tag,
      };
    });
  };

  GetAllIncompletion = async (userName, page_count, page) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const qnaLists = await Qna.findAll({
      where: {
        isResolve: { [Op.eq]: false },
      },
      order: [['createdAt', 'DESC']],
      offset: page_count * page,
      limit: page_count,
      attributes: [
        'id',
        'title',
        'isResolve',
        'createdAt',
        'category',
        'userName',
      ],
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: QnaComment, attributes: ['id'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['userName'] },
        { model: QnaBookmark, attributes: ['userName'] },
      ],
    });

    return qnaLists.map((list) => {
      let tag = [];
      let isBookmark = false;
      let isLike = false;
      for (let i = 0; i < list.QnaTags.length; i++) {
        tag.push(list.QnaTags[i]?.tag);
      }
      for (let i = 0; i < list.QnaBookmarks.length; i++) {
        if (list.QnaBookmarks[i]?.userName === userName) isBookmark = true;
      }
      for (let i = 0; i < list.QnaLikes.length; i++) {
        if (list.QnaLikes[i]?.userName === userName) isLike = true;
      }

      return {
        id: list.id,
        title: list.title,
        userName: list.userName,
        profileImg: list.User.profileImg,
        isResolve: list.isResolve,
        createdAt: list.createdAt,
        like: list.QnaLikes.length,
        isLike,
        isBookmark,
        cntcomment: list.QnaComments.length,
        category: list.category,
        tag,
      };
    });
  };

  FindOneQna = async (id, userName) => {
    const lists = await Qna.findOne({
      where: { id },
      attributes: [
        'id',
        'title',
        'content',
        'category',
        'isResolve',
        'createdAt',
        'userName',
      ],
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['userName'] },
      ],
    });
    const tag = [];
    for (let i = 0; i < lists.QnaTags?.length; i++)
      tag.push(lists.QnaTags[i]?.dataValues.tag);

    let isLike = false;
    for (let i = 0; i < lists.QnaLikes?.length; i++)
      if (lists.QnaLikes[i].userName === userName) isLike = true;

    return {
      id: lists.id,
      title: lists.title,
      content: lists.content,
      userName: lists.userName,
      profileImg: lists.User.profileImg,
      isResolve: lists.isResolve,
      like: lists.QnaLikes.length,
      isLike,
      createdAt: lists.createdAt,
      category: lists.category,
      tag,
    };
  };

  AddBookMark = async (qnaId, userName) => {
    const existLike = await QnaBookmark.findOne({
      where: { qnaId, userName },
    });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaBookmark.create({ qnaId, userName });
  };

  RemoveBookMark = async (qnaId, userName) => {
    const existLike = await QnaBookmark.findOne({
      where: { qnaId, userName },
    });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaBookmark.destroy({ where: { qnaId, userName } });
  };

  LikeQna = async (qnaId, userName) => {
    const existLike = await QnaLike.findOne({ where: { qnaId, userName } });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaLike.create({ qnaId, userName });
  };

  RemoveLikeQna = async (qnaId, userName) => {
    const existLike = await QnaLike.findOne({ where: { qnaId, userName } });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaLike.destroy({ where: { qnaId, userName } });
  };

  FindBookMark = async (userName, page, page_count) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const bookmarkLists = await QnaBookmark.findAll({
      offset: page * page_count,
      limit: page_count,
      where: { userName },
      attributes: [],
      include: [
        { model: Qna, attributes: ['id', 'title', 'createdAt', 'userName'] },
      ],
    });
    return bookmarkLists.map((list) => {
      return {
        id: list.Qna.id,
        title: list.Qna.title,
        createdAt: list.Qna.createdAt,
        userName: list.Qna.userName,
      };
    });
  };

  FindCategories = async (category, page, page_count, userName) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const filterlists = await Qna.findAll({
      offset: page * page_count,
      limit: page_count,
      where: { category },
      attributes: {
        exclude: ['updatedAt', 'UserId', 'content'],
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: QnaComment, attributes: ['id'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['id', 'userName'] },
        { model: QnaBookmark, attributes: ['userName'] },
      ],
    });

    return filterlists.map((list) => {
      let tag = [];
      let isBookmark = false;
      let isLike = false;
      for (let i = 0; i < list.QnaTags.length; i++) {
        tag.push(list.QnaTags[i]?.tag);
      }
      for (let i = 0; i < list.QnaBookmarks.length; i++) {
        if (list.QnaBookmarks[i]?.userName === userName) isBookmark = true;
      }
      for (let i = 0; i < list.QnaLikes.length; i++) {
        if (list.QnaLikes[i]?.userName === userName) isLike = true;
      }

      return {
        id: list.id,
        title: list.title,
        profileImg: list.User.profileImg,
        userName: list.userName,
        like: list.QnaLikes.length,
        cntcomment: list.QnaComments.length,
        isResolve: list.isResolve,
        isLike,
        isBookmark,
        category: list.category,
        createdAt: list.createdAt,
        tag,
      };
    });
  };

  FindUserQna = async (userName, compareName) => {
    const is_mine = userName === compareName;
    const qnalists = await Qna.findAll({
      where: { userName },
      attributes: ['id', 'title', 'isResolve', 'createdAt'],
    });
    return { is_mine, qnalists };
  };
}
export default QnaService;
