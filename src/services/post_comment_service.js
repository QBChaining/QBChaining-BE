import PostComment from '../models/post_comment.js';
import User from '../models/user.js';
import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';
import PostBookmark from '../models/post_bookmark.js';
import Notification from '../models/noti.js';

export default class PostCommentServices {
  CommentShowAll = async (post_id) => {
    const postcomment = await PostComment.findAll({
      where: { post_id: post_id },
      attributes: ['id', 'comment', 'createdAt', 'updatedAt'],
      include: [
        { model: User, attributes: ['user_name', 'user_name', 'profile_img'] },
      ],
    });
    if (postcomment) {
      return postcomment;
    } else {
      throw new BadRequestException('게시물이 없습니다');
    }
  };

  CommentShowOne = async (comment_id) => {
    const postcomment = await PostComment.findOne({
      where: { id: comment_id },
    });

    return postcomment;
  };

  CommentCreate = async (comment, user_name, post_id) => {
    if (comment.length === 0) {
      throw new BadRequestException('내용을 입력해주세요');
    }
    const postcomment = await PostComment.create({
      comment,
      user_name,
      post_id,
    });

    const findBookMark = await PostBookmark.findAll({
      where: { post_id: post_id },
    });

    if (findBookMark) {
      for (let i = 0; i < findBookMark.length; i++) {
        const noti = await Notification.create({
          data: 'post_comment',
          check: false,
          post_id,
          user_name: findBookMark[i].user_name,
        });
      }
    }
    return postcomment;
  };

  CommentUpdate = async (comment, comment_id, user_name) => {
    const find = await PostComment.findOne({
      where: { id: comment_id, user_name: user_name },
    });

    if (find === null) {
      throw new NotFoundException('수정할 수 없습니다');
    }
    if (comment.length !== 0) {
      const postcomment = await PostComment.update(
        { comment },
        {
          where: { id: comment_id, user_name: user_name },
        }
      );
      if (postcomment) {
        return { comment, id: parseInt(comment_id), user_name };
      }
    } else {
      throw new BadRequestException('내용을 입력해주세요');
    }
  };

  CommentDelete = async (comment_id, user_name) => {
    const find = await PostComment.findOne({
      where: { id: comment_id, user_name: user_name },
    });

    if (find === null) {
      throw new NotFoundException('삭제할 수 없습니다');
    } else {
      const postcomment = await PostComment.destroy({
        where: { id: comment_id, user_name: user_name },
      });
    }
  };
}
