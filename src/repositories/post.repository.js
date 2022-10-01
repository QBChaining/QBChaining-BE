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

  PostShowAll = async (page, page_count, userName) => {
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
        'likes',
        'tags',
      ],
      where: {},
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName', 'comment'] },
        {
          model: PostLike,
          attributes: ['userName'],
          where: { userName: [userName, undefined] },
          required: false,
        },
        {
          model: PostBookmark,
          attributes: ['userName'],
          where: { userName: [userName, undefined] },
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return post;
  };

  PostShowHit = async (userName) => {
    const nowMinusOneDay = new Date();
    nowMinusOneDay.setDate(nowMinusOneDay.getDate() - 1);
    nowMinusOneDay.setHours(nowMinusOneDay.getHours() + 9);

    const now = new Date();
    now.setHours(now.getHours() + 9);

    const post = await Post.findAll({
      limit: 4,
      // op.gt : 6   ===  > 6
      // op.lt : 6   ===  6 <
      where: { createdAt: { [op.gt]: nowMinusOneDay, [op.lt]: now } },
      include: [
        {
          model: PostLike,
          attributes: ['userName'],
          where: { userName: [userName, undefined] },
          required: false,
        },
      ],
      attributes: ['id', 'title', 'createdAt', 'likes'],
      order: [['likes', 'DESC']],
    });

    return post;
  };

  PostShowOne = async (postId, userName) => {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName'] },
        {
          model: PostBookmark,
          attributes: ['userName'],
          where: { userName: [userName, undefined] },
          required: false,
        },
        {
          model: PostLike,
          attributes: ['userName'],
          where: { userName: [userName, undefined] },
          required: false,
        },
      ],
    });

    return post;
  };

  PostShowUser = async (userName) => {
    const post = await User.findOne({
      where: { userName: userName },
      attributes: [],
      include: [
        { model: Post, attributes: ['title', 'id', 'createdAt', 'likes'] },
        {
          model: PostComment,
          attributes: ['comment'],
          include: [
            {
              model: Post,
              where: { userName: { [op.ne]: userName } },
              attributes: ['title', 'id', 'createdAt', 'likes'],
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
    await Post.increment({ likes: 1 }, { where: { id: postId } });

    return like;
  };

  PostLikeDestroy = async (postId, userName) => {
    const likeDelete = await PostLike.destroy({
      where: { postId: postId, userName: userName },
    });
    await Post.decrement({ likes: 1 }, { where: { id: postId } });

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
