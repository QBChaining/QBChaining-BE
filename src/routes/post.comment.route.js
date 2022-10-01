import express from 'express';
import PostCommentController from '../controllers/post.comment.controller.js';
import verifyToken from '../middlewares/auth.js';
import checkSignin from '../middlewares/check.signin.js';

const router = express.Router();

const postCommentController = new PostCommentController();

router.get('/:postId', checkSignin, postCommentController.CommentShowAll);
router.post('/:postId', verifyToken, postCommentController.CommentCreate);
router.put('/:commentId', verifyToken, postCommentController.CommentUpdate);
router.delete('/:commentId', verifyToken, postCommentController.CommentDelete);
router.post('/like/:commentId', verifyToken, postCommentController.CommentLike);
router.delete(
  '/like/:commentId',
  verifyToken,
  postCommentController.CommentLikeDelete
);

export default router;
