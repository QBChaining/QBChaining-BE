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
  QnaSearch = async (keyWords, userName, page_count, endId) => {
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

    let lists = '';
    if (endId !== 0) {
      lists = await this.searchRepository.QnaSearch(
        searchKeywords,
        userName,
        page_count,
        endId,
        Op
      );
    } else {
      lists = await this.searchRepository.FirstQnaSearch(
        searchKeywords,
        userName,
        page_count,
        endId,
        Op
      );
    }

    if (!lists.length) return '검색 결과가 없습니다.';

    return lists.map((list) => {
      return {
        id: list.id,
        title: list.title,
        content: list.content,
        userName: list.userName,
        profileImg: list.User?.profileImg,
        isResolve: list.isResolve,
        createdAt: list.createdAt,
        like: list.likes,
        isLike: !userName ? false : list.QnaLikes[0]?.userName === userName,
        isBookmark: !userName
          ? false
          : list.QnaBookmarks[0]?.userName === userName,
        cntcomment: list.QnaComments.length,
        category: list.category,
        tags: list.tags.split(','),
      };
    });
  };

  PostSearch = async (keyWords, userName, page_count, endId) => {
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
    let lists = '';
    if (endId !== 0) {
      lists = await this.searchRepository.PostSearch(
        searchKeywords,
        userName,
        page_count,
        endId,
        Op
      );
    } else {
      lists = await this.searchRepository.FirstPostSearch(
        searchKeywords,
        userName,
        page_count,
        endId,
        Op
      );
    }

    if (!lists.length) return '검색 결과가 없습니다.';

    return lists.map((list) => {
      return {
        id: list.id,
        title: list.title,
        content: list.content,
        createdAt: list.createdAt,
        userName: list.userName,
        tags: list.tags.split(','),
        profileImg: list.User?.profileImg,
        like: list.like,
        isLike: !userName ? false : list.PostLikes[0]?.userName === userName,
        isBookmark: !userName
          ? false
          : list.PostBookmarks[0]?.userName === userName,
        cntcomment: list.PostComments.length,
      };
    });
  };
}

export default SearchService;
