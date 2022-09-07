import express from 'express';
import PostCommentController from '../controllers/post_comment_controller.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

const postCommentController = new PostCommentController();

router.get('/:post_id', postCommentController.CommentShowAll);
router.post('/:post_id', verifyToken, postCommentController.CommentCreate);
router.put('/:comment_id', verifyToken, postCommentController.CommentUpdate);
router.delete('/:comment_id', verifyToken, postCommentController.CommentDelete);

export default router;
