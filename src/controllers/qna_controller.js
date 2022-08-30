import QnaService from '../services/qna_service.js';
import exceptionHandler from '../errorhandler/customexception_handler.js';

class QnaController {
  qnaService = new QnaService();

  CreateQna = async (req, res, next) => {
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

  FindAllQna = async (req, res, next) => {
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

  FindOneQna = async (req, res, next) => {
    const { id } = req.params;

    try {
      const data = await this.qnaService.findOneQna(id);
      return res
        .status(200)
        .json({ success: true, message: '상세 조회 완료', data });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  AddBookMark = async (req, res, next) => {
    const qna_id = req.params.id;
    // 세션 유저아이디 받기
    const user_id = 1;
    try {
      await this.qnaService.AddBookMark(qna_id, user_id);
      return res
        .status(200)
        .json({ success: true, message: '즐겨찾기 추가 되었습니다.' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };
}

export default QnaController;
