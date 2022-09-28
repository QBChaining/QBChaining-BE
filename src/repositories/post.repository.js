import Post from '../models/post.js';
import User from '../models/user.js';
import PostComment from '../models/post.comment.js';
import PostLike from '../models/post.like.js';
import PostBookmark from '../models/post.bookmark.js';
import Sequelize, { where } from 'sequelize';
import sequelize from '../models/sequelize.js';

const op = Sequelize.Op;

export default class PostRepository {
  PostFindOne = async (postId) => {
    const post = await Post.findOne({
      where: { id: postId },
    });

    return post;
  };
  PostLikeOne = async (postId, userName) => {
    const like = await PostLike.findOne({
      where: { postId: postId, userName: userName },
    });

    return like;
  };

  PostBookmarkOne = async (postId, userName) => {
    const bookmark = await PostBookmark.findOne({
      where: { postId: postId, userName: userName },
    });

    return bookmark;
  };

  PostShowAll = async (page, page_count) => {
    const post = await Post.findAll({
      offset: page_count * page,
      limit: page_count,
      attributes: [
        [
          sequelize.fn('substring', sequelize.col('content'), 1, 100),
          'content',
        ],
        'id',
        'title',
        'createdAt',
        'updatedAt',
        'like',
        'tags',
      ],

      where: {},
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName', 'comment'] },
        { model: PostLike, attributes: ['userName'] },
        { model: PostBookmark, attributes: ['userName'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    return post;
  };

  PostShowHit = async () => {
    const post = await Post.findAll({
      limit: 4,
      where: {},
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName', 'comment'] },
        { model: PostLike, attributes: ['userName'] },
        { model: PostBookmark, attributes: ['userName'] },
      ],
      attributes: [
        [
          sequelize.fn('substring', sequelize.col('content'), 1, 100),
          'content',
        ],
        'id',
        'title',
        'createdAt',
        'updatedAt',
        'like',
        'tags',
      ],
      order: [['like', 'DESC']],
    });

    return post.reverse();
  };

  PostShowOne = async (postId) => {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName'] },
        { model: PostBookmark, attributes: ['userName'] },
        { model: PostLike, attributes: ['userName'] },
      ],
    });

    return post;
  };

  PostShowUser = async (userName) => {
    const post = await User.findOne({
      where: { userName: userName },
      attributes: [],
      include: [
        { model: Post, attributes: ['title', 'id', 'createdAt', 'like'] },
        {
          model: PostComment,
          attributes: ['comment'],
          include: [
            {
              model: Post,
              where: { userName: { [op.ne]: userName } },
              attributes: ['title', 'id', 'createdAt', 'like'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return post;
  };

  PostCreate = async (title, content, tags, userName) => {
    const post = await Post.create({
      title,
      content,
      tags,
      userName,
    });

    return post;
  };

  PostUpdate = async (title, content, userName, postId) => {
    const post = await Post.update(
      { title, content, userName },
      { where: { id: postId, userName: userName } }
    );

    return post;
  };

  PostDelete = async (postId, userName) => {
    const post = await Post.destroy({
      where: { id: postId, userName: userName },
    });

    return post;
  };

  PostLike = async (postId, userName) => {
    const like = await PostLike.create({ postId, userName });
    await Post.increment({ like: 1 }, { where: { id: postId } });

    return like;
  };

  PostLikeDestroy = async (postId, userName) => {
    const likeDelete = await PostLike.destroy({
      where: { postId: postId, userName: userName },
    });
    await Post.decrement({ like: 1 }, { where: { id: postId } });

    return likeDelete;
  };

  PostBookmarkView = async (userName) => {
    const findBookMark = await PostBookmark.findAll({
      where: { userName: userName },
      include: {
        model: Post,
        attributes: ['title', 'userName', 'createdAt', 'id'],
      },
      attributes: [],
    });

    return findBookMark.reverse();
  };

  PostBookmark = async (postId, userName) => {
    const bookmark = await PostBookmark.create({
      postId,
      userName,
    });

    return bookmark;
  };

  PostBookmarkDestroy = async (postId, userName) => {
    const bookmark = await PostBookmark.destroy({
      where: { postId: postId, userName: userName },
    });

    return bookmark;
  };

  PostTags = async (tag, page, page_count) => {
    const tags = await Post.findOne({
      where: { tags: tag },
      include: [{ model: PostBookmark, attributes: ['userName'] }],
    });

    return tags;
  };
}
