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
    const postcomment = await this.postCommentRepository.CommentShowAll(postId);
    if (!postcomment) throw new BadRequestException('게시물이 없습니다');
    if (postcomment)
      return postcomment.map((comment) => {
        return {
          id: comment.id,
          comment: comment.comment,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          userName: comment.User.userName,
          profileImg: comment.User.profileImg,
        };
      });
  };

  CommentCreate = async (comment, userName, postId, profileImg) => {
    if (comment.length === 0) {
      throw new BadRequestException('내용을 입력해주세요');
    }
    const findpost = await this.postCommentRepository.PostFindOne(postId);

    if (!findpost) {
      throw new NotFoundException('게시물이 없습니다');
    }
    const postcomment = await this.postCommentRepository.CommentCreate(
      comment,
      userName,
      postId
    );

    // 여기쯤부터 하면댈듯
    const findBookMark = await this.postCommentRepository.PostBookmark(postId);
    if (findBookMark.length === 0) {
      const notification = await this.postCommentRepository.Notification(
        findpost
      );
    }
    if (findBookMark) {
      for (let i = 0; i < findBookMark.length; i++) {
        const num = findBookMark[i].userName;

        const commentbookmark =
          await this.postCommentRepository.CommentBookmark(postId, num);
      }
      return {
        id: postcomment.id,
        comment: postcomment.comment,
        createdAt: postcomment.createdAt,
        updatedAt: postcomment.updatedAt,
        profileImg,
        userName,
      };
    }
  };

  CommentUpdate = async (comment, commentId, userName, profileImg) => {
    const find = await this.postCommentRepository.CommentFindOneName(
      commentId,
      userName
    );
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
        return { comment, id: parseInt(commentId), userName, profileImg };
      }
    } else {
      throw new BadRequestException('내용을 입력해주세요');
    }
  };

  CommentDelete = async (commentId, userName) => {
    const find = await this.postCommentRepository.CommentFindOneName(
      commentId,
      userName
    );

    if (find === null) {
      throw new NotFoundException('삭제할 수 없습니다');
    } else {
      const postcomment = await this.postCommentRepository.CommentDestroy(
        commentId,
        userName
      );
    }
  };
}
