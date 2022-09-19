import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

import User from '../models/user.js';
import Qna from '../models/qna.js';
import QnaTag from '../models/qna.tag.js';
import QnaLike from '../models/qna.like.js';
import QnaComment from '../models/qna.comment.js';
import QnaBookmark from '../models/qna.bookmark.js';
import Post from '../models/post.js';
import PostTag from '../models/post.tag.js';
import PostLike from '../models/post.like.js';
import PostBookmark from '../models/post.bookmark.js';
import PostComment from '../models/post.comment.js';
import sequelize from 'sequelize';

const Op = sequelize.Op;

class SearchService {
  QnaSearch = async (keyWords, userName, page_count, page) => {
    if (!keyWords || keyWords.trim() === '')
      throw new BadRequestException('검색 조건이 옳지 않습니다.');

    const splitwords = keyWords.split(' ');
    const searchKeywords = [];

    for (let i = 0; i < splitwords.length; i++) {
      const title = { title: { [Op.startsWith]: splitwords[i] } };
      const content = { content: { [Op.startsWith]: splitwords[i] } };
      searchKeywords.push(title);
      searchKeywords.push(content);
    }

    const lists = await Qna.findAll({
      offset: page_count * page,
      limit: page_count,
      attributes: {
        exclude: ['updatedAt', 'content'],
      },
      where: {
        [Op.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['id', 'userName'] },
        { model: QnaBookmark, attributes: ['userName'] },
        { model: QnaComment, attributes: ['id'] },
      ],
    });
    if (!lists.length) return '검색 결과가 없습니다.';

    return lists.map((list) => {
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
        is_resolve: list.is_resolve,
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

  PostSearch = async (keyWords, userName, page_count, page) => {
    if (!keyWords || keyWords.trim() === '')
      throw new BadRequestException('검색 조건이 옳지 않습니다.');

    const splitwords = keyWords.split(' ');
    const searchKeywords = [];

    for (let i = 0; i < splitwords.length; i++) {
      const title = { title: { [Op.startsWith]: splitwords[i] } };
      const content = { content: { [Op.startsWith]: splitwords[i] } };
      searchKeywords.push(title);
      searchKeywords.push(content);
    }

    const lists = await Post.findAll({
      offset: page_count * page,
      limit: page_count,
      attributes: {
        exclude: ['updatedAt', 'content'],
      },
      where: {
        [Op.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: PostTag, attributes: ['tag'] },
        { model: PostLike, attributes: ['id', 'userName'] },
        { model: PostBookmark, attributes: ['userName'] },
        { model: PostComment, attributes: ['id'] },
      ],
    });
    if (!lists.length) return '검색 결과가 없습니다.';

    return lists.map((list) => {
      let tag = [];
      let isBookmark = false;
      let isLike = false;
      for (let i = 0; i < list.PostTags.length; i++) {
        tag.push(list.PostTags[i]?.tag);
      }
      for (let i = 0; i < list.PostBookmarks.length; i++) {
        if (list.PostBookmarks[i]?.userName === userName) isBookmark = true;
      }
      for (let i = 0; i < list.PostLikes.length; i++) {
        if (list.PostLikes[i]?.userName === userName) isLike = true;
      }

      return {
        id: list.id,
        title: list.title,
        userName: list.userName,
        profileImg: list.User.profileImg,
        is_resolve: list.is_resolve,
        createdAt: list.createdAt,
        like: list.PostLikes.length,
        isLike,
        isBookmark,
        cntcomment: list.PostComments.length,
        tag,
      };
    });
  };
}
//수정:
export default SearchService;
