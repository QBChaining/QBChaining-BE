import QnaCommentService from '../services/q.comment.service.js';

import exceptionHandler from '../errorhandler/customException_handler.js';

class QnaCommentController {
  qnaCommentService = new QnaCommentService();

  CreateQnaComment = async (req, res, next) => {
    const qnaId = req.params.id;
    const { comment } = req.body;
    const { userName } = req.decoded;

    try {
      const data = await this.qnaCommentService.CreateQnaComment(
        qnaId,
        userName,
        comment
      );

      return res
        .status(201)
        .json({ success: true, message: '댓글 작성 완료', data });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  FindAllComment = async (req, res, next) => {
    const { page_count, page } = req.query;
    const { id } = req.params;
    const userName = req.user?.userName;
    try {
      const data = await this.qnaCommentService.FindAllComment(
        id,
        userName,
        page_count * 1,
        page * 1
      );
      return res
        .status(200)
        .json({ success: true, message: '댓글 조회 완료', data });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  LikeComment = async (req, res, next) => {
    const { userName } = req.decoded;
    const { id } = req.params;
    try {
      await this.qnaCommentService.LikeComment(id, userName);
      return res.status(200).json({ success: true, message: '댓글 추천 완료' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  RemoveLikeComment = async (req, res, next) => {
    const { userName } = req.decoded;
    const { id } = req.params;
    try {
      await this.qnaCommentService.RemoveLikeComment(id, userName);
      return res.status(200).json({ success: true, message: '댓글 삭제 완료' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  ChooseComment = async (req, res, next) => {
    const comment_id = req.params.id;
    const userName = req.decoded.userName;

    try {
      await this.qnaCommentService.ChooseComment(comment_id, userName);
      return res.status(200).json({ success: true, message: '댓글 채택 완료' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };
}

export default QnaCommentController;
