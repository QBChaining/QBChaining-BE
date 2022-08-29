import express, { application } from 'express';

const router = express.Router();

import authRouter from './auth_router.js';
import userRouter from './user.route.js';
import postRouter from './post.route.js';
import commentRouter from './comment.route.js';
import QnApostRouter from './QnApost.route.js';
import QnACommentRouter from './QnAComment.route.js';

// 이거 api명세서 하고 정하기
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/QnApost', QnApostRouter);
router.use('/QnAComment', QnACommentRouter);

export default router;
