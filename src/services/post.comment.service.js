import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';
import PostCommentRepository from '../repositories/post.comment.repository.js';

export default class PostCommentServices {
  postCommentRepository = new PostCommentRepository();

  CommentShowAll = async (postId) => {
    const postcomment = this.postCommentRepository.CommentShowAll(postId);
    if (!postcomment) throw new BadRequestException('게시물이 없습니다');
    if (postcomment) return postcomment;
  };

  CommentShowOne = async (commentId) => {
    const postcomment = this.postCommentRepository.CommentShowOne(commentId);

    if (!postcomment) throw new BadRequestException('게시물이 없습니다');

    return postcomment;
  };

  CommentCreate = async (comment, userName, postId) => {
    if (comment.length === 0) {
      throw new BadRequestException('내용을 입력해주세요');
    }
    const postcomment = await this.postCommentRepository.CommentCreate(
      comment,
      userName,
      postId
    );

    const findpost = await this.postCommentRepository.PostFindOne(postId);

    if (!findpost) {
      throw new NotFoundException('게시물이 없습니다');
    }
    // 여기쯤부터 하면댈듯
    const findBookMark = await this.postCommentRepository.PostBookmark(postId);

    if (findBookMark.length === 0) {
      const notification = await this.postCommentRepository.Notification(
        findpost
      );
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
        profileImg,
        userName,
      };
    }
  };

  CommentUpdate = async (comment, commentId, userName, profileImg) => {
    // 여기 안했는데 무지성 레포생성해도대나
    const find = await PostComment.findOne({
      where: { id: comment_id, user_name: user_name },
    });

    if (find === null) {
      throw new NotFoundException('수정할 수 없습니다');
    }
    if (comment.length !== 0) {
      const postcomment = await this.postCommentRepository.CommentUpdate(
        comment,
        commentId,
        userName
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
