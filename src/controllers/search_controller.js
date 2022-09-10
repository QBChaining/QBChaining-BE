import exceptionHandler from '../errorhandler/customException_handler.js';
import SearchService from '../services/search_service.js';

class SearchCotroller {
  searchService = new SearchService();

  Search = async (req, res, next) => {
    const allQuery = req.query;
    console.log(allQuery);
    res.send(allQuery);
  };
}

export default SearchCotroller;
