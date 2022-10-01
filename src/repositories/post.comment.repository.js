import PostBookmark from '../models/post.bookmark.js';
import Notification from '../models/noti.js';
import PostComment from '../models/post.comment.js';
import User from '../models/user.js';
import Post from '../models/post.js';
import sequelize, { where } from 'sequelize';
import PostCommentLike from '../models/post.comment.like.js';

const option = sequelize.Op;

export default class PostCommentRepository {
  PostFindOne = async (postId) => {
    const findpost = await Post.findOne({
      where: { id: postId },
    });

    return findpost;
  };

  PostBookmark = async (postId, userName) => {
    const bookmark = await PostBookmark.findAll({
      where: { postId: postId, userName: { [option.ne]: userName } },
    });

    return bookmark;
  };

  Notification = async (findpost) => {
    const notification = await Notification.create({
      type: 'blog',
      check: false,
      postId: findpost.id,
      userName: findpost.userName,
    });

    return notification;
  };

  CreateNoti = async (notipost, notiname) => {
    const notification = await Notification.create({
      type: 'blog',
      check: false,
      postId: notipost,
      userName: notiname,
    });
  };

  CommentShowAll = async (postId, userName) => {
    const postcomment = await PostComment.findAll({
      where: { postId: postId },
      attributes: ['id', 'comment', 'createdAt', 'updatedAt', 'like'],
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        {
          model: PostCommentLike,
          attributes: ['userName'],
          where: { userName: [userName, undefined] },
          required: false,
        },
      ],
    });
    return postcomment;
  };

  CommentCreate = async (comment, userName, postId) => {
    const postcomment = await PostComment.create({
      comment,
      userName,
      postId,
    });

    return postcomment;
  };

  CommentUpdate = async (comment, commentId, userName) => {
    const postcomment = await PostComment.update(
      { comment },
      {
        where: { id: commentId, userName: userName },
      }
    );

    return postcomment;
  };

  CommentFindOneName = async (commentId, userName) => {
    const postcomment = await PostComment.findOne({
      where: { id: commentId, userName: userName },
    });

    return postcomment;
  };

  CommentFindOne = async (commentId) => {
    const postcomment = await PostComment.findOne({
      where: { id: commentId },
    });

    return postcomment;
  };

  CommentDestroy = async (commentId, userName) => {
    const postdestroy = await PostComment.destroy({
      where: { id: commentId, userName: userName },
    });

    return postdestroy;
  };

  CommentBookmark = async (postId, num) => {
    const commentbookmark = await Notification.create({
      type: 'posts',
      check: false,
      postId,
      userName: num,
    });

    return commentbookmark;
  };
  CommentLikeFind = async (commentId, userName) => {
    const commentlike = await PostCommentLike.findOne({
      where: { postCommentId: commentId, userName: userName },
    });

    return commentlike;
  };

  PostCommentLike = async (commentId, userName) => {
    const like = await PostCommentLike.create({
      postCommentId: commentId,
      userName,
    });
    await PostComment.increment({ like: 1 }, { where: { id: commentId } });

    return like;
  };

  PostCommentLikeDelete = async (commentId, userName) => {
    const likeDelete = await PostCommentLike.destroy({
      where: { postCommentId: commentId, userName: userName },
    });
    await PostComment.decrement({ like: 1 }, { where: { id: commentId } });

    return likeDelete;
  };
}
