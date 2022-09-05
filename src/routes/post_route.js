import express from 'express';
import PostController from '../controllers/post_controller.js';

const router = express.Router();

const postController = new PostController();

router.get('/', postController.PostShowAll);
router.get('/:post_id', postController.PostShowOne);
router.get('/my/:user_id', postController.PostShowMy);
router.post('/', postController.PostCreate);
router.put('/:post_id', postController.PostUpdate);
router.delete('/:post_id', postController.PostDelete);

router.post('/like/:post_id', postController.PostLike);
router.delete('/like/:post_id', postController.PostLikeDelete);
router.post('/bookmark/:post_id', postController.PostBookMark);
router.delete('/bookmark/:post_id', postController.PostBookMarkDelete);
router.get('/bookmark/:post_id', postController.PostBookMarkView);

export default router;
