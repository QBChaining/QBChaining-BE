import exceptionHandler from '../errorhandler/customException_handler.js';
import SearchService from '../services/search_service.js';

class SearchCotroller {
  searchService = new SearchService();

  QnaSearch = async (req, res, next) => {
    const { page_count, page } = req.query;
    const { q } = req.query;
    const user_name = req.user?.name;
    try {
      const data = await this.searchService.QnaSearch(
        q,
        user_name,
        page_count * 1,
        page * 1
      );
      return res
        .status(200)
        .json({ success: true, message: 'Qna 검색 조회 성공', data });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };

  PostSearch = async (req, res, next) => {
    const { page_count, page } = req.query;
    const { q } = req.query;
    const user_name = req.user?.name;
    try {
      const data = await this.searchService.PostSearch(
        q,
        user_name,
        page_count * 1,
        page * 1
      );
      return res
        .status(200)
        .json({ success: true, message: 'Post 검색 조회 성공', data });
    } catch (err) {
      console.log(err);
      const exception = exceptionHandler(err);

      return res
        .status(exception.statusCode)
        .json({ success: exception.success, message: exception.message });
    }
  };
}

export default SearchCotroller;
