import exceptionHandler from '../errorhandler/customException_handler.js';
import SearchService from '../services/search_service.js';

class SearchCotroller {
  searchService = new SearchService();

  Search = async (req, res, next) => {
    const { q } = req.query;

    const data = await this.searchService.Search(q);
    res.send(data);
  };
}

export default SearchCotroller;
