import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

import Qna from '../models/qna.js';
import QnaComment from '../models/qna_comment.js';
import QnaCommentLike from '../models/qna_comment_like.js';
import User from '../models/user.js';
import QnaBookmark from '../models/qna_bookmark.js';
import Notification from '../models/noti.js';

class QnaCommentService {
  CreateQnaComment = async (qna_id, user_name, comment) => {
    if (!comment) throw new BadRequestException('내용 입력은 필수');

    const existQna = await Qna.findOne({ where: { id: qna_id } });
    if (!existQna) throw new NotFoundException('게시물이 존재 하지 않음');

    const commentdata = await QnaComment.create({ qna_id, user_name, comment });

    const findQna = await QnaBookmark.findAll({
      where: { qna_id },
    });

    if (findQna.length === 0) {
      await Notification.create({
        type: 'qna',
        check: false,
        qna_id: existQna.id,
        user_name: existQna.user_name,
      });
    }

    if (findQna) {
      for (let i = 0; i < findQna.length; i++) {
        await Notification.create({
          type: 'qna',
          check: false,
          qna_id,
          user_name: findQna[i].user_name,
        });
      }
    }
    return {
      id: commentdata.id,
      comment: commentdata.comment,
      user_name: commentdata.user_name,
      createdAt: commentdata.createdAt,
    };
  };

  FindAllComment = async (qna_id, user_name, page_count, page) => {
    if (!page_count) throw new BadRequestException('page_count is null');
    const commentLists = await QnaComment.findAll({
      where: { qna_id },
      offset: page_count * page,
      limit: page_count,
      attributes: {
        include: ['id', 'comment', 'is_choose', 'createdAt', 'user_name'],
      },
      include: [
        { model: QnaCommentLike, attributes: ['user_name'] },
        { model: User, attributes: ['profile_img'] },
      ],
    });
    return commentLists
      .map((list) => {
        let is_honey_tip = false;

        for (let i = 0; i < list.QnaCommentLikes?.length; i++) {
          if (list.QnaCommentLikes[i]?.user_name === user_name)
            is_honey_tip = true;
        }

        return {
          id: list.id,
          comment: list.comment,
          user_name: list.user_name,
          profile_img: list.User.profile_img,
          createdAt: list.createdAt,
          honey_tip: list.QnaCommentLikes.length,
          is_choose: list.is_choose,
          is_honey_tip,
        };
      })
      .sort((a, b) => {
        a = a.honey_tip;
        b = b.honey_tip;
        return b - a;
      });
  };

  LikeComment = async (qna_comment_id, user_name) => {
    const existLike = await QnaCommentLike.findOne({
      where: { qna_comment_id, user_name },
    });
    if (existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaCommentLike.create({ qna_comment_id, user_name });
  };

  RemoveLikeComment = async (qna_comment_id, user_name) => {
    const existLike = await QnaCommentLike.findOne({
      where: { qna_comment_id, user_name },
    });
    if (!existLike) throw new ConflictException('반복해서 눌렀습니다.');
    else await QnaCommentLike.destroy({ where: { qna_comment_id, user_name } });
  };

  ChooseComment = async (qna_comment_id, user_name) => {
    const existComment = await QnaComment.findByPk(qna_comment_id);
    if (!existComment) throw new ConflictException('존재하지 않는 댓글입니다.');

    const qna = await existComment.getQna();
    if (qna.user_name !== user_name)
      throw new ConflictException('채택은 게시글 작성자만 가능합니다.');
    else {
      await Qna.update({ is_resolve: true }, { where: { id: qna.id } });
      await QnaComment.update(
        { is_choose: true },
        { where: { id: qna_comment_id } }
      );
    }
  };
}

export default QnaCommentService;
