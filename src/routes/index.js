import express from 'express';

import auth_route from './auth_route.js';
import postRouter from './post_route.js';
import qnaRouter from './qna_route.js';
import PostCommentRouter from './post_comment_route.js';
import Notification_Router from './notification.js';

const router = express.Router();

router.use('/posts', postRouter);
router.use('/qna', qnaRouter);
router.use('/comments', PostCommentRouter);
router.use('/auth', auth_route);
router.use('/notification', Notification_Router);

export default router;
