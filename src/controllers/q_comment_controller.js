import QnaCommentService from '../services/q_comment_service.js';

import exceptionHandler from '../errorhandler/customException_handler.js';

class QnaCommentController {
  qnaCommentService = new QnaCommentService();

  CreateQnaComment = async (req, res, next) => {
    const qna_id = req.params.id;
    const { comment } = req.body;
    const { user_name } = req.user;

    try {
      await this.qnaCommentService.CreateQnaComment(qna_id, user_name, comment);

      return res.status(201).json({ success: true, message: '댓글 작성 완료' });
    } catch (err) {
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  FindAllComment = async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await this.qnaCommentService.FindAllComment(id);
      return res
        .status(200)
        .json({ success: true, message: '댓글 조회 완료', data });
    } catch (err) {
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  UpdateComment = async (req, res, next) => {
    const { id } = req.params;
    const { comment } = req.body;
    const { user_name } = req.user;
    try {
      await this.qnaCommentService.UpdateComment(id, comment, user_name);
      return res.status(200).json({ success: true, message: '댓글 수정 완료' });
    } catch (err) {
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  RemoveComment = async (req, res, next) => {
    const { id } = req.params;
    const { comment } = req.body;
    const { user_name } = req.user;
    try {
      await this.qnaCommentService.RemoveComment(id, comment, user_name);
      return res.status(200).json({ success: true, message: '댓글 삭제 완료' });
    } catch (err) {
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  LikeComment = async (req, res, next) => {
    const { user_name } = req.user;
    const { id } = req.params;
    try {
      await this.qnaCommentService.LikeComment(id, user_name);
      return res.status(200).json({ success: true, message: '댓글 추천 완료' });
    } catch (err) {
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  RemoveLikeComment = async (req, res, next) => {
    const { user_name } = req.user;
    const { id } = req.params;
    try {
      await this.qnaCommentService.RemoveLikeComment(id, user_name);
      return res.status(200).json({ success: true, message: '댓글 삭제 완료' });
    } catch (err) {
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  ChooseComment = async (req, res, next) => {
    const comment_id = req.params.id;
    const user_id = req.user.id;

    try {
      await this.qnaCommentService.ChooseComment(comment_id, user_id);
      return res.status(200).json({ success: true, message: '댓글 채택 완료' });
    } catch (err) {
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };
}

export default QnaCommentController;
