import express from 'express';

import authroute from './auth.route.js';
import postRouter from './post.route.js';
import qnaRouter from './qna.route.js';
import PostCommentRouter from './post.comment.route.js';
import NotificationRouter from './notification.js';

const router = express.Router();

router.use('/posts', postRouter);
router.use('/qna', qnaRouter);
router.use('/comments', PostCommentRouter);
router.use('/auth', authroute);
router.use('/notification', NotificationRouter);

export default router;
