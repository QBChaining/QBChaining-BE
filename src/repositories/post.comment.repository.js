import PostBookmark from '../models/post.bookmark.js';
import Notification from '../models/noti.js';
import PostComment from '../models/post.comment.js';
import User from '../models/user.js';
import Post from '../models/post.js';
import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

export default class PostCommentRepository {
  PostFindOne = async (postId) => {
    const findpost = await Post.findOne({
      where: { id: postId },
    });

    return findpost;
  };

  PostBookmark = async (postId) => {
    const bookmark = await PostBookmark.findAll({
      where: { postId: postId },
    });

    return bookmark;
  };

  Notification = async (findpost) => {
    const notification = await Notification.create({
      type: 'posts',
      check: false,
      postId: findpost.id,
      userName: findpost.userName,
    });

    return notification;
  };

  CommentShowAll = async (postId) => {
    const postcomment = await PostComment.findAll({
      where: { postId: postId },
      attributes: ['id', 'comment', 'createdAt', 'updatedAt'],
      include: [{ model: User, attributes: ['userName', 'profileImg'] }],
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
}
