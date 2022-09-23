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
    tags = tags.join();

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
      tags: qnainfo.tags.split(','),
    };
  };

  GetAllQna = async (userName, page_count, page, status) => {
    if (!page_count) throw new BadRequestException('page_count is null');

    const qnaLists = await this.qnaRepository.GetAllQna(
      userName,
      page_count,
      page,
      status
    );

    return qnaLists.map((list) => {
      let isBookmark = '';
      if (!userName) isBookmark = false;
      else isBookmark = list.QnaBookmarks[0]?.userName === userName;

      let isLike = false;
      for (let i = 0; i < list.QnaLikes.length; i++) {
        if (list.QnaLikes[i]?.userName === userName) {
          isLike = true;
          break;
        }
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
        tags: list.tags.split(','),
      };
    });
  };

  GetOneQna = async (id, userName) => {
    const list = await this.qnaRepository.GetOneQna(id, userName);

    let isBookmark = '';
    if (!userName) isBookmark = false;
    else isBookmark = list.QnaBookmarks[0]?.userName === userName;

    let isLike = false;
    for (let i = 0; i < list.QnaLikes.length; i++) {
      if (list.QnaLikes[i]?.userName === userName) {
        isLike = true;
        break;
      }
    }
    return {
      id: list.id,
      title: list.title,
      content: list.content,
      userName: list.userName,
      profileImg: list.User.profileImg,
      isResolve: list.isResolve,
      like: list.QnaLikes.length,
      isLike,
      isBookmark,
      createdAt: list.createdAt,
      category: list.category,
      tags: list.tags?.split(','),
    };
  };

  AddBookMark = async (qnaId, userName) => {
    const existBookMark = await this.qnaRepository.FindBookMark(
      qnaId,
      userName
    );

    if (existBookMark) throw new ConflictException('반복해서 눌렀습니다.');

    await this.qnaRepository.AddBookMark(qnaId, userName);
  };

  RemoveBookMark = async (qnaId, userName) => {
    const existBookMark = await this.qnaRepository.FindBookMark(
      qnaId,
      userName
    );

    if (!existBookMark) throw new ConflictException('반복해서 눌렀습니다.');

    this.qnaRepository.RemoveBookMark(qnaId, userName);
  };

  LikeQna = async (qnaId, userName) => {
    const existLike = await this.qnaRepository.FindQnaLike(qnaId, userName);
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    this.qnaRepository.LikeQna(qnaId, userName);
  };

  RemoveLikeQna = async (qnaId, userName) => {
    const existLike = await this.qnaRepository.FindQnaLike(qnaId, userName);
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    this.qnaRepository.RemoveLikeQna(qnaId, userName);
  };

  GetUserBookmark = async (userName, page, page_count) => {
    if (!page_count) throw new BadRequestException('page_count is null');

    const bookmarkLists = await this.qnaRepository.GetUserBookmark(
      userName,
      page,
      page_count
    );

    return bookmarkLists.map((list) => {
      return {
        id: list.Qna.id,
        title: list.Qna.title,
        createdAt: list.Qna.createdAt,
        userName: list.Qna.userName,
      };
    });
  };

  GetCategories = async (category, page, page_count, userName, status) => {
    if (!page_count) throw new BadRequestException('page_count is null');

    const filterlists = await this.qnaRepository.GetQnaCategory(
      category,
      page,
      page_count,
      userName,
      status
    );

    return filterlists.map((list) => {
      let isBookmark = '';
      if (!userName) isBookmark = false;
      else isBookmark = list.QnaBookmarks[0]?.userName === userName;

      let isLike = false;
      for (let i = 0; i < list.QnaLikes.length; i++) {
        if (list.QnaLikes[i]?.userName === userName) {
          isLike = true;
          break;
        }
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
        tags: list.tags.split(','),
      };
    });
  };

  GetUserQna = async (userName) => {
    const userQnaInfoLists = await this.qnaRepository.GetUserQna(userName);

    return {
      myAnswer: userQnaInfoLists[0].QnaComments,
      myQna: userQnaInfoLists[0].Qnas,
    };
  };
}
export default QnaService;
