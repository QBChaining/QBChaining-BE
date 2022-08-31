import express from 'express';

import QnaController from '../controllers/qna_controller.js';
import QnaCommentController from '../controllers/q_comment_controller.js';
const router = express.Router();
const qnaController = new QnaController();
const qnaCommentController = new QnaCommentController();

router.get('/', qnaController.FindAllQna);
router.get('/:id', qnaController.FindOneQna);
router.post('/', qnaController.CreateQna);
router.post('/:id/bookmark', qnaController.AddBookMark);
router.delete('/:id/bookmark', qnaController.RemoveBookMark);
router.post('/:id/like', qnaController.LikeQna);
router.delete('/:id/like', qnaController.RemoveLikeQna);

router.post('/:id/comments', qnaCommentController.CreateQnaComment);
export default router;
