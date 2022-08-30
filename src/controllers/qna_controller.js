import QnaService from '../services/qna_service.js';
import exceptionHandler from '../errorhandler/customexception_handler.js';

class qnaController {
  qnaService = new QnaService();

  createQna = async (req, res, next) => {
    // 아이디받기 세션 or 토큰
    // const { id } = res.locals
    const id = 1;
    const { title, content, category, tag } = req.body;

    try {
      await this.qnaService.createQna(title, content, category, tag, id);

      return res
        .status(201)
        .json({ success: true, message: '게시글 작성 되었습니다.' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  findAllQna = async (req, res, next) => {
    try {
      const data = await this.qnaService.findAllQna();

      return res
        .status(200)
        .json({ succses: true, message: '전체 조회 성공', data });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };
}

export default qnaController;
