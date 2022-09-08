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

export default class PostCommentServices {
  CommentShowAll = async (post_id) => {
    const postcomment = await PostComment.findAll({
      where: { post_id: post_id },
      attributes: ['id', 'comment', 'user_name', 'createdAt', 'updatedAt'],
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
    if (comment.length !== 0) {
      const postcomment = await PostComment.create({
        comment,
        user_name,
        post_id,
      });
      return postcomment;
    } else {
      throw new BadRequestException('내용을 입력해주세요');
    }
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
      const find = await PostComment.findOne({
        where: { id: comment_id },
      });
      return find;
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
