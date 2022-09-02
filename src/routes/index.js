import express, { application } from 'express';
import postRouter from './post_route.js';
import qnaRouter from './qna_route.js';
import PostCommentRouter from './post_comment_route.js';

const router = express.Router();

router.use('/posts', postRouter);
router.use('/qna', qnaRouter);
router.use('/comments', PostCommentRouter);

export default router;
