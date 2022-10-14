import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

import QnaCommentRepository from '../repositories/q.comment.repository.js';
import Notification from '../models/noti.js';

class QnaCommentService {
  qnaCommentRepository = new QnaCommentRepository();

  CreateQnaComment = async (qnaId, userName, comment) => {
    if (!comment) throw new BadRequestException('내용 입력은 필수');

    const existQna = await this.qnaCommentRepository.FindQna(qnaId);
    if (!existQna) throw new NotFoundException('게시물이 존재 하지 않음');

    const commentdata = await this.qnaCommentRepository.CreateComment(
      qnaId,
      userName,
      comment
    );
    console.log(userName);
    if (existQna.userName === userName) {
      const commentbookmark =
        await this.qnaCommentRepository.QnaCommentBookmark(qnaId, userName);

      commentbookmark.map(async (noti) => {
        await this.qnaCommentRepository.CreateNoti(noti.qnaId, noti.userName);
      });
    }

    if (existQna.userName !== userName) {
      const commentbookmark =
        await this.qnaCommentRepository.QnaCommentBookmark(qnaId, userName);

      if (commentbookmark.length === 0) {
        await this.qnaCommentRepository.Notification(existQna);
      }
      commentbookmark.map(async (noti) => {
        await this.qnaCommentRepository.CreateNoti(noti.qnaId, noti.userName);
      });
    }

    return {
      id: commentdata.id,
      comment: commentdata.comment,
      userName: commentdata.userName,
      createdAt: commentdata.createdAt,
    };
  };

  GetQnaComment = async (qnaId, userName, page_count, page) => {
    if (!page_count) throw new BadRequestException('page_count is null');

    let commentLists = await this.qnaCommentRepository.GetQnaComment(
      qnaId,
      page_count,
      page,
      userName
    );
    commentLists = commentLists.map((list) => {
      return {
        id: list.id,
        comment: list.comment,
        userName: list.userName,
        profileImg: list.User?.profileImg,
        createdAt: list.createdAt,
        like: list.likes,
        isChoose: list.isChoose,
        isLike: !userName
          ? false
          : list.QnaCommentLikes[0]?.userName === userName,
      };
    });
    return { commentLists };
  };

  LikeComment = async (qnaCommentId, userName) => {
    const existLike = await this.qnaCommentRepository.FindQnaLike(
      qnaCommentId,
      userName
    );
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');

    await this.qnaCommentRepository.LikeQna(qnaCommentId, userName);
  };

  RemoveLikeComment = async (qnaCommentId, userName) => {
    const existLike = await this.qnaCommentRepository.FindQnaLike(
      qnaCommentId,
      userName
    );
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');

    await this.qnaCommentRepository.RemoveLikeQna(qnaCommentId, userName);
  };

  ChooseComment = async (CommentId, userName) => {
    const existComment = await this.qnaCommentRepository.FindComment(CommentId);
    if (!existComment) throw new ConflictException('존재하지 않는 댓글입니다.');
    const qna = await existComment.getQna();
    if (qna.userName !== userName)
      throw new ConflictException('채택은 게시글 작성자만 가능합니다.');

    await this.qnaCommentRepository.UpdateStatusQna(qna.id);
    await this.qnaCommentRepository.UpdateStatusComment(CommentId);
  };
}

export default QnaCommentService;
