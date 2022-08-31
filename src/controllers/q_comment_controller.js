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
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };
}

export default QnaCommentController;
