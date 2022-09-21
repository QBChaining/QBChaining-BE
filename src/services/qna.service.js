import {
  CustomException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

import QnaRepository from '../repositories/qna.repository.js';

class QnaService {
  qnaRepository = new QnaRepository();

  CreateQna = async (title, content, category, tags, userName) => {
    if (!title || !content || !category || tags.length > 5) {
      throw new BadRequestException(`입력값이 없거나 잘못 되었습니다.`);
    }
    tags = tags.join(',');

    const qnainfo = await this.qnaRepository.CreateQna(
      title,
      content,
      category,
      userName,
      tags
    );

    return {
      isResolve: qnainfo.isResolve,
      id: qnainfo.id,
      userName: qnainfo.userName,
      title: qnainfo.title,
      content: qnainfo.content,
      category: qnainfo.category,
      updatedAt: qnainfo.updatedAt,
      like: 0,
      qnaTag: qnainfo.tags.split(','),
    };
  };

  GetAllQnaCompletion = async (userName, page_count, page) => {
    if (!page_count) throw new BadRequestException('page_count is null');

    const qnaLists = await this.qnaRepository.GetAllQnaCompletion(
      userName,
      page_count,
      page
    );

    return qnaLists.map((list) => {
      return {
        id: list.id,
        title: list.title,
        userName: list.userName,
        profileImg: list.User.profileImg,
        isResolve: list.isResolve,
        createdAt: list.createdAt,
        like: list.QnaLikes.length,
        isLike: list.QnaBookmarks[0]?.userName === userName ? true : false,
        isBookmark: list.QnaBookmarks[0]?.userName === userName ? true : false,
        cntcomment: list.QnaComments.length,
        category: list.category,
        tags: list.tags.split(','),
      };
    });
  };

  GetAllIncompletion = async (userName, page_count, page) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const qnaLists = await this.qnaRepository.GetAllIncompletion(
      userName,
      page_count,
      page
    );

    return qnaLists.map((list) => {
      let isBookmark = false;
      let isLike = false;

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
        tags: list.tags,
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

        { model: QnaLike, attributes: ['userName'] },
      ],
    });

    let isLike = false;
    for (let i = 0; i < lists.QnaLikes?.length; i++)
      if (lists.QnaLikes[i].userName === userName) isLike = true;

    return {
      id: lists.id,
      title: lists.title,
      content: lists.content,
      userName: lists.userName,
      profileImg: lists.User?.profileImg,
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

        { model: QnaLike, attributes: ['id', 'userName'] },
        { model: QnaBookmark, attributes: ['userName'] },
      ],
    });

    return filterlists.map((list) => {
      let tag = [];
      let isBookmark = false;
      let isLike = false;

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
