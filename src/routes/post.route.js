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
router.get('/:post_id', checkSignin, postController.PostShowOne);
router.get('/users/:user_name', checkSignin, postController.PostShowMy);

router.post('/', verifyToken, postController.PostCreate);
router.put('/:post_id', verifyToken, postController.PostUpdate);
router.delete('/:post_id', verifyToken, postController.PostDelete);

router.post('/like/:post_id', verifyToken, postController.PostLike);
router.get('/like/all', verifyToken, postController.PostLikeShow);
router.delete('/like/:post_id', verifyToken, postController.PostLikeDelete);

router.post('/bookmark/:post_id', verifyToken, postController.PostBookMark);
router.delete(
  '/bookmark/:post_id',
  verifyToken,
  postController.PostBookMarkDelete
);

export default router;
