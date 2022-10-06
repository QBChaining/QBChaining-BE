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
  QnaSearch = async (searchKeywords, userName, page_count, endId, Option) => {
    return await Qna.findAll({
      limit: page_count,
      attributes: [
        'id',
        'title',
        'isResolve',
        'createdAt',
        'category',
        'userName',
        'tags',
        'likes',
        [
          sequelize.fn('substring', sequelize.col('content'), 1, 100),
          'content',
        ],
      ],
      where: {
        id: { [Option.gt]: endId },
        [Option.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        {
          model: QnaLike,
          attributes: ['userName'],
          where: { userName: { [Option.eq]: `${userName}` } },
          required: false,
        },
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
  FirstQnaSearch = async (
    searchKeywords,
    userName,
    page_count,
    endId,
    Option
  ) => {
    return await Qna.findAll({
      offset: endId * page_count,
      limit: page_count,
      attributes: [
        'id',
        'title',
        'isResolve',
        'createdAt',
        'category',
        'userName',
        'tags',
        'likes',
        [
          sequelize.fn('substring', sequelize.col('content'), 1, 100),
          'content',
        ],
      ],
      where: {
        [Option.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        {
          model: QnaLike,
          attributes: ['userName'],
          where: { userName: { [Option.eq]: `${userName}` } },
          required: false,
        },
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

  FirstPostSearch = async (
    searchKeywords,
    userName,
    page_count,
    endId,
    Option
  ) => {
    return await Post.findAll({
      offset: page_count * endId,
      limit: page_count,
      attributes: [
        'id',
        'title',
        'createdAt',
        'userName',
        'tags',
        'likes',
        [
          sequelize.fn('substring', sequelize.col('content'), 1, 100),
          'content',
        ],
      ],
      where: {
        [Option.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        {
          model: PostLike,
          attributes: ['userName'],
          where: { userName: { [Option.eq]: `${userName}` } },
          required: false,
        },
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
  PostSearch = async (searchKeywords, userName, page_count, endId, Option) => {
    return await Post.findAll({
      limit: page_count,
      attributes: [
        'id',
        'title',
        'createdAt',
        'userName',
        'tags',
        'likes',
        [
          sequelize.fn('substring', sequelize.col('content'), 1, 100),
          'content',
        ],
      ],
      where: {
        id: { [Option.gt]: endId },
        [Option.or]: searchKeywords,
      },
      include: [
        { model: User, attributes: ['profileImg'] },
        {
          model: PostLike,
          attributes: ['userName'],
          where: { userName: { [Option.eq]: `${userName}` } },
          required: false,
        },
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
