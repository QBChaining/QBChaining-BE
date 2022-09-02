import QnaService from '../services/qna_service.js';
import exceptionHandler from '../errorhandler/customException_handler.js';

class QnaController {
  qnaService = new QnaService();

  CreateQna = async (req, res, next) => {
    const user_id = req.decoded.id;

    const { title, content, category, tag } = req.body;

    try {
      await this.qnaService.CreateQna(title, content, category, tag, user_id);

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
      const data = await this.qnaService.FindAllQna();

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
      const data = await this.qnaService.FindOneQna(id);
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
    const user_id = req.decoded.id;
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

  RemoveBookMark = async (req, res, next) => {
    const qna_id = req.params.id;
    const user_id = req.decoded.id;

    try {
      await this.qnaService.RemoveBookMark(qna_id, user_id);
      return res
        .status(200)
        .json({ success: true, message: '즐겨찾기 삭제 되었습니다.' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  LikeQna = async (req, res, next) => {
    const qna_id = req.params.id;
    const user_id = req.decoded.id;
    try {
      await this.qnaService.LikeQna(qna_id, user_id);
      return res.status(200).json({ success: true, message: '추천 완료' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  RemoveLikeQna = async (req, res, next) => {
    const qna_id = req.params.id;
    const user_id = req.decoded.id;
    try {
      await this.qnaService.RemoveLikeQna(qna_id, user_id);
      return res.status(200).json({ success: true, message: '추천 최소' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  FindBookMark = async (req, res, next) => {
    const id = req.decoded.id;
    try {
      const data = await this.qnaService.FindBookMark(id);

      return res
        .status(200)
        .json({ success: true, message: '즐겨찾기 조회 완료', data });
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
