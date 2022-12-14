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

  CommentShowAll = async (postId, userName) => {
    const postcomment = await this.postCommentRepository.CommentShowAll(
      postId,
      userName
    );
    if (!postcomment) throw new NotFoundException('게시물이 없습니다');
    if (postcomment)
      return postcomment.map((comment) => {
        let isLike = false;
        if (
          comment.PostCommentLikes[0]?.userName === userName &&
          userName !== undefined
        ) {
          isLike = true;
        }
        return {
          id: comment.id,
          comment: comment.comment,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          userName: comment.User.userName,
          profileImg: comment.User.profileImg,
          like: comment.likes,
          isLike: isLike,
        };
      });
  };

  CommentCreate = async (comment, userName, postId, profileImg) => {
    if (comment.length === 0) {
      throw new BadRequestException('내용을 입력해주세요');
    }

    if (comment.length > 500)
      throw new BadRequestException('500자 이하를 입력해주세요');

    const findpost = await this.postCommentRepository.PostFindOne(postId);

    if (!findpost) {
      throw new NotFoundException('게시물이 없습니다');
    }

    const postcomment = await this.postCommentRepository.CommentCreate(
      comment,
      userName,
      postId
    );
    if (findpost.userName === userName) {
      const findBookMark = await this.postCommentRepository.PostBookmark(
        postId,
        userName
      );

      findBookMark.map(async (noti) => {
        await this.postCommentRepository.CreateNoti(noti.postId, noti.userName);
      });
    }

    if (findpost.userName !== userName) {
      const findBookMark = await this.postCommentRepository.PostBookmark(
        postId,
        userName
      );
      if (findBookMark.length === 0) {
        await this.postCommentRepository.Notification(findpost);
      }
      findBookMark.map(async (noti) => {
        await this.postCommentRepository.CreateNoti(noti.postId, noti.userName);
      });
    }

    return {
      id: postcomment.id,
      comment: postcomment.comment,
      createdAt: postcomment.createdAt,
      userName,
      profileImg,
    };
  };

  CommentUpdate = async (comment, commentId, userName, profileImg) => {
    if (comment.length > 500)
      throw new BadRequestException('500자 이하를 입력해주세요');

    const find = await this.postCommentRepository.CommentFindOneName(
      commentId,
      userName
    );
    if (find === null) {
      throw new BadRequestException('수정할 수 없습니다');
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
      throw new ConflictException('삭제할 수 없습니다');
    } else {
      const postcomment = await this.postCommentRepository.CommentDestroy(
        commentId,
        userName
      );
    }
  };

  CommentLike = async (commentId, userName) => {
    const findcomment = await this.postCommentRepository.CommentFindOne(
      commentId
    );

    if (!findcomment) throw new NotFoundException('존재하지 않는 댓글입니다');

    const findlike = await this.postCommentRepository.CommentLikeFind(
      commentId,
      userName
    );

    if (findlike) throw new ConflictException('좋아요를 두번 누르셨습니다');

    const like = await this.postCommentRepository.PostCommentLike(
      commentId,
      userName
    );

    return like;
  };

  CommentLikeDelete = async (commentId, userName) => {
    const findcomment = await this.postCommentRepository.CommentFindOne(
      commentId
    );
    if (!findcomment) throw new NotFoundException('존재하지 않는 댓글입니다');

    const findlike = await this.postCommentRepository.CommentLikeFind(
      commentId,
      userName
    );

    if (!findlike)
      throw new ConflictException('좋아요 삭제를 두번 누르셨습니다');

    const likedelete = await this.postCommentRepository.PostCommentLikeDelete(
      commentId,
      userName
    );

    return likedelete;
  };
}
