import express, { application } from 'express';

const router = express.Router();

import postRouter from './post_route.js';

router.use('/posts', postRouter);

export default router;
