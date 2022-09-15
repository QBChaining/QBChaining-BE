import express from 'express';

import QnaController from '../controllers/qna_controller.js';
import QnaCommentController from '../controllers/q_comment_controller.js';
import SearchCotroller from '../controllers/search_controller.js';

import check_signin from '../middlewares/check_signin.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();
const qnaController = new QnaController();
const qnaCommentController = new QnaCommentController();
const searchController = new SearchCotroller();

router.use(check_signin);

router.get('/bookmark', verifyToken, qnaController.FindBookMark);
router.get('/search', searchController.QnaSearch);
router.get('/categories/:category', qnaController.FindCategories);
router.get('/users/:user_name', qnaController.FindUserQna);
router.get('/', qnaController.FindAllQna);
router.get('/:id', qnaController.FindOneQna);
router.get('/:id/comments', qnaCommentController.FindAllComment);

router.use(verifyToken);

router.post('/', qnaController.CreateQna);
router.post('/:id/bookmark', qnaController.AddBookMark);
router.post('/:id/like', qnaController.LikeQna);
router.delete('/:id/bookmark', qnaController.RemoveBookMark);
router.delete('/:id/like', qnaController.RemoveLikeQna);

router.post('/:id/comments', qnaCommentController.CreateQnaComment);
router.post('/comments/:id/like', qnaCommentController.LikeComment);
router.post('/comments/:id/choice', qnaCommentController.ChooseComment);
router.delete('/comments/:id/like', qnaCommentController.RemoveLikeComment);

export default router;
