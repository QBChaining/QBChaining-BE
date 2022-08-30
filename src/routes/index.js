import express from 'express';

import auth_route from './auth_route.js';
import postRouter from './post_route.js';
import qnaRouter from './qna_route.js';

const router = express.Router();

router.use('/auth', auth_route);
router.use('/posts', postRouter);
router.use('/qna', qnaRouter);

export default router;
