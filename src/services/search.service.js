import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';
import sequelize from 'sequelize';
import SearchRepository from '../repositories/search.repository.js';

class SearchService {
  searchRepository = new SearchRepository();
  QnaSearch = async (keyWords, userName, page_count, page) => {
    if (!keyWords || keyWords.trim() === '')
      throw new BadRequestException('검색 조건이 옳지 않습니다.');
    const Op = sequelize.Op;
    const splitwords = keyWords.split(' ');
    const searchKeywords = [];

    for (let i = 0; i < splitwords.length; i++) {
      const title = { title: { [Op.substring]: splitwords[i] } };
      const content = { content: { [Op.substring]: splitwords[i] } };
      searchKeywords.push(title);
      searchKeywords.push(content);
    }

    const lists = await this.searchRepository.QnaSearch(
      searchKeywords,
      userName,
      page_count,
      page,
      Op
    );

    if (!lists.length) return '검색 결과가 없습니다.';

    return lists.map((list) => {
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
        profileImg: list.User?.profileImg,
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

  PostSearch = async (keyWords, userName, page_count, page) => {
    if (!keyWords || keyWords.trim() === '')
      throw new BadRequestException('검색 조건이 옳지 않습니다.');
    const Op = sequelize.Op;
    const splitwords = keyWords.split(' ');
    const searchKeywords = [];

    for (let i = 0; i < splitwords.length; i++) {
      const title = { title: { [Op.startsWith]: splitwords[i] } };
      const content = { content: { [Op.startsWith]: splitwords[i] } };
      searchKeywords.push(title);
      searchKeywords.push(content);
    }

    const lists = await this.searchRepository.PostSearch(
      searchKeywords,
      userName,
      page_count,
      page,
      Op
    );
    if (!lists.length) return '검색 결과가 없습니다.';

    return lists.map((list) => {
      let isBookmark = '';
      if (!userName) isBookmark = false;
      else isBookmark = list.PostBookmarks[0]?.userName === userName;

      let isLike = false;
      for (let i = 0; i < list.PostLikes.length; i++) {
        if (list.PostLikes[i]?.userName === userName) {
          isLike = true;
          break;
        }
      }

      return {
        id: list.id,
        title: list.title,
        userName: list.userName,
        profileImg: list.User?.profileImg,
        isResolve: list.isResolve,
        createdAt: list.createdAt,
        like: list.PostLikes.length,
        isLike,
        isBookmark,
        cntcomment: list.PostComments.length,
        tags: list.tags.split(','),
      };
    });
  };
}

export default SearchService;
