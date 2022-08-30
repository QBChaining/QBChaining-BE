import express from 'express';

import QnaController from '../controllers/qna_controller.js';

const router = express.Router();
const qnaController = new QnaController();

router.get('/', qnaController.FindAllQna);
router.get('/:id', qnaController.FindOneQna);
router.post('/', qnaController.CreateQna);
router.post('/:id/bookmark', qnaController.AddBookMark);
router.delete('/:id/bookmark', qnaController.RemoveBookMark);
export default router;
