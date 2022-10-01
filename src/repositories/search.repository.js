import User from '../models/user.js';
import Qna from '../models/qna.js';
import QnaLike from '../models/qna.like.js';
import QnaComment from '../models/qna.comment.js';
import QnaBookmark from '../models/qna.bookmark.js';
import Post from '../models/post.js';
import PostLike from '../models/post.like.js';
import PostBookmark from '../models/post.bookmark.js';
import PostComment from '../models/post.comment.js';
import sequelize from 'sequelize';
import { db } from '../models/index.js';

export default class SearchRepository {
  // QnaSearch = async (searchKeywords, userName, page_count, page, Option) => {
  //   // return Qna.findAll({
  //   //   where: { content: { [Option.substring]: '재철님' } },
  //   // });
  //   return db.sequelize.query(
  //     `SELECT *, 'User.id'
  //      FROM (SELECT 'Qna.id', 'Qna.title', 'Qna.category', 'Qna.isResolve', 'Qna.tags', 'Qna.likes', 'Qna.createdAt', 'Qna.userName'
  //      FROM qna AS Qna
  //      WHERE (MATCH(content) AGAINST ('node') OR MATCH(content) AGAINST('node')) LIMIT 0, 10)
  //      LEFT OUTER JOIN qnaLike AS QnaLikes ON 'Qna.id' = 'QnaLikes.qnaId'
  //      LEFT OUTER JOIN qnaBookmark AS QnaBookmarks ON 'Qna.id' = 'QnaBookmarks.qnaId' AND 'QnaBookmarks.userName' = 'taesikyoon'
  //      LEFT OUTER JOIN qnaComment AS QnaComment ON 'Qna.id' = 'QnaComments.qnaId'`
  //   );
  // };
  QnaSearch = async (searchKeywords, userName, page_count, page, Option) => {
    return await Qna.findAll({
      offset: page_count * page,
      limit: page_count,
      attributes: {
        exclude: ['updatedAt', 'content'],
      },
      where: {
        [Option.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: QnaLike, attributes: ['id', 'userName'] },
        {
          model: QnaBookmark,
          attributes: ['userName'],
          where: { userName: { [Option.eq]: `${userName}` } },
          required: false,
        },
        { model: QnaComment, attributes: ['id'] },
      ],
    });
  };

  PostSearch = async (searchKeywords, userName, page_count, page, Option) => {
    return await Post.findAll({
      offset: page_count * page,
      limit: page_count,
      attributes: {
        exclude: ['updatedAt', 'content'],
      },
      where: {
        [Option.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        { model: PostLike, attributes: ['id', 'userName'] },
        {
          model: PostBookmark,
          attributes: ['userName'],
          where: { userName: { [Option.eq]: `${userName}` } },
          required: false,
        },
        { model: PostComment, attributes: ['id'] },
      ],
    });
  };
}
