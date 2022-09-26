import Post from '../models/post.js';
import User from '../models/user.js';
import PostComment from '../models/post.comment.js';
import PostLike from '../models/post.like.js';
import PostBookmark from '../models/post.bookmark.js';

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
    const post = await Post.findAll({
      where: { userName: userName },
      include: [
        { model: PostLike, attributes: ['userName'] },
        { model: User, attributes: ['userName', 'profileImg'] },
      ],
      attributes: [
        'id',
        'title',
        'content',
        'createdAt',
        'updatedAt',
        'userName',
        'tags',
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

    return like;
  };

  PostLikeDestroy = async (postId, userName) => {
    const likeDelete = await PostLike.destroy({
      where: { postId: postId, userName: userName },
    });

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

    return findBookMark;
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

  PostTags = async (tag) => {
    const tags = await Post.findOne({
      where: { tags: tag },
      include: [{ model: PostBookmark, attributes: ['userName'] }],
    });

    console.log(tags);

    return tags;
  };
}
