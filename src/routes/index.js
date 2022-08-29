import express, { application } from 'express';

const router = express.Router();

import qnqRouter from './qna.js';

router.use('/qna', qnqRouter);

export default router;
