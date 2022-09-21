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
  CommentShowOne = async (commentId) => {
    const postcomment = await PostComment.findOne({
      where: { id: commentId },
    });

    return postcomment;
  };

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
      post_id: findpost.id,
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
  };
}
