import PostService from '../services/post_service.js';
import exceptionHandler from '../errorhandler/customException_handler.js';

export default class PostController {
  postService = new PostService();

  PostShowAll = async (req, res, next) => {
    try {
      const postShowAll = await this.postService.PostShowAll();
      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postShowAll,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostShowComment = async (req, res, next) => {
    try {
      const postShowComment = await this.postService.PostShowComment();
      return res.status(200).json({
        success: true,
        message: '조회 성공1',
        data: postShowComment,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostShowLike = async (req, res, next) => {
    try {
      const postShowAll = await this.postService.PostShowLike();
      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postShowAll,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostShowhit = async (req, res, next) => {
    try {
      const postShowhit = await this.postService.PostShowhit();
      return res.status(200).json({
        success: true,
        message: '히트상품조회성공',
        data: postShowhit,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostShowOne = async (req, res, next) => {
    const post_id = req.params.post_id;
    try {
      const postShowOne = await this.postService.PostShowOne(post_id);

      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postShowOne,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostShowMy = async (req, res, next) => {
    const user_id = 2;
    try {
      const PostShowMy = await this.postService.PostShowMy(user_id);

      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: PostShowMy,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostCreate = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const tag = req.body.tag;
    const user_id = req.decoded.id;
    try {
      const postCreate = await this.postService.PostCreate(
        title,
        content,
        tag,
        user_id
      );

      return res.status(200).json({
        success: true,
        message: '작성 성공',
        data: postCreate,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostUpdate = async (req, res, next) => {
    const user_id = req.decoded.id;
    const title = req.body.title;
    const content = req.body.content;
    const tag = req.body.tag;
    const post_id = req.params.post_id;

    try {
      const postUpdate = await this.postService.PostUpdate(
        title,
        content,
        tag,
        user_id,
        post_id
      );

      return res.status(200).json({
        success: true,
        message: '수정 성공',
        data: postUpdate,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostDelete = async (req, res, next) => {
    const user_id = req.decoded.id;
    const post_id = req.params.post_id;
    try {
      const postDelete = await this.postService.PostDelete(post_id, user_id);
      return res.status(200).json({
        success: true,
        message: '삭제 성공',
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };
  PostLikeShow = async (req, res, next) => {
    const user_id = req.decoded.id;
    // const post_id = req.params.post_id;
    try {
      const post = await this.postService.PostLikeShow(user_id);
      return res.status(200).json({
        success: true,
        message: 'success',
        data: post,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostLike = async (req, res, next) => {
    const user_id = req.decoded.id;
    const post_id = req.params.post_id;
    try {
      const postLike = await this.postService.PostLike(post_id, user_id);
      return res.status(200).json({
        success: true,
        message: '좋아요 성공',
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostLikeDelete = async (req, res, next) => {
    const user_id = req.decoded.id;
    const post_id = req.params.post_id;
    try {
      const postLikeDelete = await this.postService.PostLikeDelete(
        post_id,
        user_id
      );
      return res.status(200).json({
        success: true,
        message: '좋아요 삭제 성공',
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostBookMark = async (req, res, next) => {
    const user_id = req.decoded.id;
    const post_id = req.params.post_id;

    try {
      const PostBookMark = await this.postService.PostBookMark(
        post_id,
        user_id
      );
      return res.status(200).json({
        success: true,
        message: '즐겨찾기 성공',
      });
    } catch (error) {
      const exception = exceptionHandler(error);
      console.log(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostBookMarkDelete = async (req, res, next) => {
    const user_id = req.decoded.id;
    const post_id = req.params.post_id;

    try {
      const PostBookMark = await this.postService.PostBookMarkDelete(
        post_id,
        user_id
      );
      return res.status(200).json({
        success: true,
        message: '즐겨찾기 삭제 성공',
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostBookMarkView = async (req, res, next) => {
    const user_id = req.decoded.id;
    const post_id = req.params.post_id;

    try {
      const PostBookMarkView = await this.postService.PostBookMarkView(
        post_id,
        user_id
      );
      return res.status(200).json({
        success: true,
        message: '즐겨찾기 한 게시물',
        data: PostBookMarkView,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  NotiCheck = async (req, res, next) => {
    const noti_id = req.params.noti_id;
    const post_id = req.params.post_id;
    const user_id = req.decoded.id;

    try {
      const NotiCheck = await this.postService.NotiCheck(
        noti_id,
        post_id,
        user_id
      );
      return res.status(200).json({
        success: true,
        message: '읽었던것을 다시누르면 false 안읽은것을 눌렀다면 true',
        data: NotiCheck,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  NotiNoti = async (req, res, next) => {
    const noti_id = req.params.noti_id;
    const post_id = req.params.post_id;
    const user_id = req.decoded.id;

    try {
      const NotiNoti = await this.postService.NotiNoti(
        noti_id,
        post_id,
        user_id
      );
      return res.status(200).json({
        success: true,
        message: '노티보여주기',
        data: NotiNoti,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };
}
