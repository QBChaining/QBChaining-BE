import express from 'express';

import QnaController from '../controllers/qna_controller.js';

const router = express.Router();
const qnaController = new QnaController();

router.post('/', qnaController.createQna);

export default router;
