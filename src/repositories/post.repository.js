import Post from '../models/post.js';
import User from '../models/user.js';
import PostComment from '../models/post.comment.js';
import PostLike from '../models/post.like.js';
import PostBookmark from '../models/post.bookmark.js';
import PostTag from '../models/post.tag.js';

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

  PostShowAll = async () => {
    const post = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName', 'comment'] },
        { model: PostLike, attributes: ['userName'] },
        { model: PostBookmark, attributes: ['userName'] },
        { model: PostTag, attributes: ['tag'], raw: true },
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
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
    });

    return post;
  };

  PostShowUser = async (userName) => {
    const post = await Post.findAll({
      where: { userName: userName },
      include: [
        { model: PostLike, attributes: ['userName'] },
        { model: PostTag, attributes: ['tag'], raw: true },
        { model: User },
      ],
      attributes: [
        'id',
        'title',
        'content',
        'createdAt',
        'updatedAt',
        'userName',
      ],
      order: [['createdAt', 'DESC']],
    });

    return post;
  };

  PostCreate = async (title, content, postTags, userName) => {
    const post = await Post.create({
      title,
      content,
      userName,
    });
    const postTag = [];
    for (const tag of postTags) {
      const tagdata = await PostTag.create({
        postId: post.id,
        tag,
      });
      postTag.push(tagdata.tag);
    }

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

  FindTag = async (tag) => {
    const findTag = await PostTag.findAll({
      where: { tag: tag },
    });

    return findTag;
  };

  PostTags = async (num) => {
    const tags = await Post.findOne({
      where: { id: num },
      include: [
        { model: PostTag, attributes: ['tag'], raw: true },
        { model: PostBookmark, attributes: ['userName'] },
      ],
    });

    return tags;
  };
}
