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
import Post from '../models/post.js';
import sequelize from 'sequelize';
const Op = sequelize.Op;
class SearchService {
  QnaSearch = async (keyWords, user_id) => {
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
      attributes: {
        exclude: ['updatedAt', 'UserId', 'user_id'],
      },
      where: {
        [Op.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['user_name', 'profile_img'] },
        { model: QnaTag, attributes: ['tag'] },
        { model: QnaLike, attributes: ['id', 'user_id'] },
        { model: QnaBookmark, attributes: ['user_id'] },
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
        if (list.QnaBookmarks[i]?.user_id === user_id) is_bookmark = true;
      }
      for (let i = 0; i < list.QnaLikes.length; i++) {
        if (list.QnaLikes[i]?.user_id === user_id) is_honey_tip = true;
      }

      return {
        id: list.id,
        title: list.title,
        // content: list.content,
        is_resolve: list.is_resolve,
        createdAt: list.createdAt,
        honey_tip: list.QnaLikes.length,
        is_honey_tip,
        is_bookmark,
        cntcomment: list.QnaComments.length,
        category: list.category,
        tag,
        user: list.User,
      };
    });
  };
}

export default SearchService;
