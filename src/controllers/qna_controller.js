import QnaService from '../services/qna_service.js';
import exceptionHandler from '../errorhandler/customexception_handler.js';

class qnaController {
  qnaService = new QnaService();

  createQna = async (req, res, next) => {
    // 아이디받기 세션 or 토큰
    // const { id } = res.locals
    const { title, content, tag, rowtag } = req.body;

    try {
      await this.qnaService.createQna(title, content, tag, rowtag);

      return res
        .status(201)
        .json({ success: true, message: '게시글 작성 되었습니다.' });
    } catch (err) {
      const exception = exceptionHandler(err);

      res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };
}

export default qnaController;
