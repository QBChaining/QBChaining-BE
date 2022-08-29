import express from 'express';
import PostController from '../controllers/post_controller.js';

const router = express.Router();

const postController = new PostController();

router.get('/', postController.postShowAll);
router.get('/:post_id', postController.postShowOne);
router.post('/create', postController.postCreate);
router.put('/:post_id', postController.postUpdate);
router.delete('/:post_id', postController.postDelete);

export default router;
