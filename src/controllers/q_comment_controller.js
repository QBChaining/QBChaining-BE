import QnaCommentService from '../services/q_comment_service.js';

import exceptionHandler from '../errorhandler/customException_handler.js';

class QnaCommentController {
  qnaCommentService = new QnaCommentService();

  CreateQnaComment = async (req, res, next) => {
    const qna_id = req.params.id;
    const { comment } = req.body;
    const { name } = req.decoded;

    try {
      const data = await this.qnaCommentService.CreateQnaComment(
        qna_id,
        name,
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
    const user_name = req.user?.name;
    try {
      const data = await this.qnaCommentService.FindAllComment(
        id,
        user_name,
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
    const { name } = req.decoded;
    const { id } = req.params;
    try {
      await this.qnaCommentService.LikeComment(id, name);
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
    const { name } = req.decoded;
    const { id } = req.params;
    try {
      await this.qnaCommentService.RemoveLikeComment(id, name);
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
    const user_name = req.decoded.name;

    try {
      await this.qnaCommentService.ChooseComment(comment_id, user_name);
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
