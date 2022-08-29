import express, { application } from 'express';

const router = express.Router();

import qnqRouter from './qna_route.js';

router.use('/qna', qnqRouter);

export default router;
