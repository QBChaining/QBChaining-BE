import express from 'express';

import check_signin from '../middlewares/check_signin.js';
import SearchCotroller from '../controllers/search_controller.js';

const searchController = new SearchCotroller();
const router = express.Router();

router.use(check_signin);

router.get('/', searchController.Search);

export default router;
