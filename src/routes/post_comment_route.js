import express from 'express';
import PostCommentController from '../controllers/post_comment_controller.js';

const router = express.Router();

const postCommentController = new PostCommentController();

router.get('/:post_id', postCommentController.CommentShowAll);
router.post('/:post_id', postCommentController.CommentCreate);
router.put('/:comment_id', postCommentController.CommentUpdate);
router.delete('/:comment_id', postCommentController.CommentDelete);

export default router;
