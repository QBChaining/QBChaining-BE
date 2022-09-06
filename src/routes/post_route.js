import express from 'express';
import PostController from '../controllers/post_controller.js';

const router = express.Router();

const postController = new PostController();

// 게시물 전체조회 (시간순)
router.get('/', postController.PostShowAll);

// 게시물 전체조회 (댓글순)
router.get('/comment', postController.PostShowComment);

// 게시물 전체조회 (추천순)
router.get('/like', postController.PostShowLike);

// 게시물 전체조회 (히트순)
router.get('/hits', postController.PostShowhit);

// 게시물 상세조회
router.get('/:post_id', postController.PostShowOne);

// 나의 게시물 조회
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
