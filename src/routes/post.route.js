import express from 'express';
import PostController from '../controllers/post.controller.js';
import verifyToken from '../middlewares/auth.js';
import checkSignin from '../middlewares/check.signin.js';
import SearchCotroller from '../controllers/search.controller.js';
const router = express.Router();

const postController = new PostController();
const searchCotroller = new SearchCotroller();

router.get('/', checkSignin, postController.PostShowAll);
router.get('/search', checkSignin, searchCotroller.PostSearch);
router.get('/comment', checkSignin, postController.PostShowComment);
router.get('/like', checkSignin, postController.PostShowLike);
router.get('/hits', checkSignin, postController.PostShowhit);
router.get('/bookmark', verifyToken, postController.PostBookMarkView);
router.get('/tags', checkSignin, postController.PostTagShow);
router.get('/:postId', checkSignin, postController.PostShowOne);
router.get('/users/:userName', checkSignin, postController.PostShowUser);

router.post('/', verifyToken, postController.PostCreate);
router.put('/:postId', verifyToken, postController.PostUpdate);
router.delete('/:postId', verifyToken, postController.PostDelete);

router.post('/like/:postId', verifyToken, postController.PostLike);
router.get('/like/all', verifyToken, postController.PostLikeShow);
router.delete('/like/:postId', verifyToken, postController.PostLikeDelete);

router.post('/bookmark/:postId', verifyToken, postController.PostBookMark);
router.delete(
  '/bookmark/:postId',
  verifyToken,
  postController.PostBookMarkDelete
);

export default router;
