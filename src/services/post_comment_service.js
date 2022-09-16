import PostComment from '../models/post_comment.js';
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
import PostBookmark from '../models/post_bookmark.js';
import Notification from '../models/noti.js';

export default class PostCommentServices {
  CommentShowAll = async (post_id) => {
    const postcomment = await PostComment.findAll({
      where: { post_id: post_id },
      attributes: ['id', 'comment', 'createdAt', 'updatedAt'],
      include: [{ model: User, attributes: ['user_name', 'profile_img'] }],
    });
    if (postcomment) {
      return postcomment.reverse();
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

  CommentCreate = async (comment, user_name, post_id, profile_img) => {
    if (comment.length === 0) {
      throw new BadRequestException('내용을 입력해주세요');
    }
    const postcomment = await PostComment.create({
      comment,
      user_name,
      post_id,
    });

    const findpost = await Post.findOne({
      where: { id: post_id },
    });

    if (!findpost) {
      throw new NotFoundException('게시물이 없습니다');
    }

    const findBookMark = await PostBookmark.findAll({
      where: { post_id: post_id },
    });

    if (findBookMark.length === 0) {
      await Notification.create({
        type: 'posts',
        check: false,
        post_id: findpost.id,
        user_name: findpost.user_name,
      });
    }
    if (findBookMark) {
      for (let i = 0; i < findBookMark.length; i++) {
        await Notification.create({
          type: 'posts',
          check: false,
          post_id,
          user_name: findBookMark[i].user_name,
        });
      }
      return {
        id: postcomment.id,
        comment: postcomment.comment,
        created_at: postcomment.createdAt,
        updated_at: postcomment.updatedAt,
        profile_img,
        user_name,
      };
    }
  };

  CommentUpdate = async (comment, comment_id, user_name, profile_img) => {
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
        return { comment, id: parseInt(comment_id), user_name, profile_img };
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
