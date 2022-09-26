import QnaService from '../services/qna.service.js';
import exceptionHandler from '../errorhandler/customException.handler.js';

class QnaController {
  qnaService = new QnaService();

  CreateQna = async (req, res, next) => {
    const { userName } = req.decoded;
    const { title, content, category, tags } = req.body;

    try {
      const data = await this.qnaService.CreateQna(
        title,
        content,
        category,
        tags,
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

  GetAllQna = async (req, res, next) => {
    try {
      const { page_count, page, resolve } = req.query;
      const userName = req.user?.userName;
      const data = await this.qnaService.GetAllQna(
        userName,
        page_count * 1,
        page * 1,
        resolve
      );

      return res
        .status(200)
        .json({ success: true, message: ' 채택 게시글 전체 조회 성공', data });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  GetOneQna = async (req, res, next) => {
    const { id } = req.params;
    const userName = req.user?.userName;
    try {
      const data = await this.qnaService.GetOneQna(id, userName);
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

  GetUserBookmark = async (req, res, next) => {
    const { page, page_count } = req.query;
    const userName = req.decoded.userName;
    try {
      const data = await this.qnaService.GetUserBookmark(
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

  GetCategories = async (req, res, next) => {
    const { page, page_count, resolve } = req.query;
    const { category } = req.params;
    const userName = req.user?.userName;

    try {
      const data = await this.qnaService.GetCategories(
        category,
        page * 1,
        page_count * 1,
        userName,
        resolve
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

  GetUserQna = async (req, res, next) => {
    const userName = req.params.username;

    try {
      const data = await this.qnaService.GetUserQna(userName);
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

  GetHotQna = async (req, res, next) => {
    try {
      const data = await this.qnaService.GetHotQna();
      return res
        .status(200)
        .json({ success: true, message: '핫 게시글 조회 완료', data });
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
