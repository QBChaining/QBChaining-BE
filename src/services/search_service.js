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
import QnaTag from '../models/qna_tag.js';
import QnaLike from '../models/qna_like.js';
import QnaComment from '../models/qna_comment.js';
import QnaBookmark from '../models/qna_bookmark.js';
import Post from '../models/post.js';
import PostTag from '../models/post_tag.js';
import PostLike from '../models/post_like.js';
import PostBookmark from '../models/post_bookmark.js';
import PostComment from '../models/post_comment.js';
import sequelize from 'sequelize';

const Op = sequelize.Op;

class SearchService {
  QnaSearch = async (keyWords, user_name, page_count, page) => {
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
        { model: User, attributes: ['profile_img'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['id', 'user_name'] },
        { model: QnaBookmark, attributes: ['user_name'] },
        { model: QnaComment, attributes: ['id'] },
      ],
    });
    if (!lists.length) return '검색 결과가 없습니다.';

    return lists.map((list) => {
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

  PostSearch = async (keyWords, user_name, page_count, page) => {
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
        { model: User, attributes: ['profile_img'] },
        { model: PostTag, attributes: ['tag'] },
        { model: PostLike, attributes: ['id', 'user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostComment, attributes: ['id'] },
      ],
    });
    if (!lists.length) return '검색 결과가 없습니다.';

    return lists.map((list) => {
      let tag = [];
      let is_bookmark = false;
      let is_honey_tip = false;
      for (let i = 0; i < list.PostTags.length; i++) {
        tag.push(list.PostTags[i]?.tag);
      }
      for (let i = 0; i < list.PostBookmarks.length; i++) {
        if (list.PostBookmarks[i]?.user_name === user_name) is_bookmark = true;
      }
      for (let i = 0; i < list.PostLikes.length; i++) {
        if (list.PostLikes[i]?.user_name === user_name) is_honey_tip = true;
      }

      return {
        id: list.id,
        title: list.title,
        user_name: list.user_name,
        profile_img: list.User.profile_img,
        is_resolve: list.is_resolve,
        createdAt: list.createdAt,
        honey_tip: list.PostLikes.length,
        is_honey_tip,
        is_bookmark,
        cntcomment: list.PostComments.length,
        tag,
      };
    });
  };
}
//수정:
export default SearchService;
