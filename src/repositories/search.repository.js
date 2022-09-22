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

export default class SearchRepository {
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
