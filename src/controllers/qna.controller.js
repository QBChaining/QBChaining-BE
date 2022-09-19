import QnaService from '../services/qna.service.js';
import exceptionHandler from '../errorhandler/customException.handler.js';

class QnaController {
  qnaService = new QnaService();

  CreateQna = async (req, res, next) => {
    const { userName } = req.decoded;
    const { title, content, category, tag } = req.body;

    try {
      const data = await this.qnaService.CreateQna(
        title,
        content,
        category,
        tag,
        userName
      );

      return res
        .status(201)
        .json({ success: true, message: '게시글 작성 되었습니다.', data });
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
      const { page_count, page } = req.query;
      const userName = req.user?.userName;
      const data = await this.qnaService.FindAllQna(
        userName,
        page_count * 1,
        page * 1
      );

      return res
        .status(200)
        .json({ success: true, message: '전체 조회 성공', data });
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
    const userName = req.user?.userName;
    try {
      const data = await this.qnaService.FindOneQna(id, userName);
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
    const qnaId = req.params.id * 1;
    const userName = req.decoded.userName;
    try {
      await this.qnaService.AddBookMark(qnaId, userName);
      return res
        .status(201)
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
    const qnaId = req.params.id * 1;
    const userName = req.decoded.userName;

    try {
      await this.qnaService.RemoveBookMark(qnaId, userName);
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
    const qnaId = req.params.id * 1;
    const userName = req.decoded.userName;
    try {
      await this.qnaService.LikeQna(qnaId, userName);
      return res.status(201).json({ success: true, message: '추천 완료' });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  RemoveLikeQna = async (req, res, next) => {
    const qnaId = req.params.id * 1;
    const userName = req.decoded.userName;
    try {
      await this.qnaService.RemoveLikeQna(qnaId, userName);
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
    const { page, page_count } = req.query;
    const userName = req.decoded.userName;
    try {
      const data = await this.qnaService.FindBookMark(
        userName,
        page * 1,
        page_count * 1
      );

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

  FindCategories = async (req, res, next) => {
    const { page, page_count } = req.query;
    const { category } = req.params;
    const userName = req.user?.userName;

    try {
      const data = await this.qnaService.FindCategories(
        category,
        page * 1,
        page_count * 1,
        userName
      );
      return res
        .status(200)
        .json({ success: true, message: '카테고리 게시글 조회 완료', data });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  FindUserQna = async (req, res, next) => {
    const { userName } = req.params;
    const compare_id = req.user.id;

    try {
      const data = await this.qnaService.FindUserQna(userName, compare_id);
      return res
        .status(200)
        .json({ success: true, message: '유저 게시글 조회 완료', data });
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
