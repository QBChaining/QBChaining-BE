import exceptionHandler from '../errorhandler/customException_handler.js';
import SearchService from '../services/search_service.js';

class SearchCotroller {
  searchService = new SearchService();

  QnaSearch = async (req, res, next) => {
    const { q } = req.query;
    const user_id = req.user?.id;
    try {
      const data = await this.searchService.QnaSearch(q, user_id);
      return res
        .status(200)
        .json({ success: true, message: '검색 조회 성공', data });
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
