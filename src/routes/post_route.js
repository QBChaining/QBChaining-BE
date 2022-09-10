import express from 'express';
import PostController from '../controllers/post_controller.js';
import verifyToken from '../middlewares/auth.js';
import check_signin from '../middlewares/check_signin.js';

const router = express.Router();

const postController = new PostController();

router.get('/', check_signin, postController.PostShowAll);
router.get('/comment', check_signin, postController.PostShowComment);
router.get('/like', check_signin, postController.PostShowLike);
router.get('/hits', check_signin, postController.PostShowhit);
router.get('/:post_id', check_signin, postController.PostShowOne);
router.get('/my/:user_id', verifyToken, postController.PostShowMy);

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
router.get('/bookmark/:post_id', verifyToken, postController.PostBookMarkView);

router.post('/noti/:post_id/:noti_id', verifyToken, postController.NotiCheck);
router.get('/noti/:post_id/:noti_id', verifyToken, postController.NotiNoti);

export default router;
