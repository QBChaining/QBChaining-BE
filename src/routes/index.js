import express, { application } from 'express';
import postRouter from './post_route.js';
import qnaRouter from './qna_route.js';

const router = express.Router();



router.use('/posts', postRouter);
router.use('/qna', qnaRouter);


export default router;
