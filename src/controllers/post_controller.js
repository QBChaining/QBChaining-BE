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
      return next(error);
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
      return next(error);
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
      return next(error);
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
      return next(error);
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
      return next(error);
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
      return next(error);
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
      });
    } catch (error) {
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
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
        data: { title, content },
      });
    } catch (error) {
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
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
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
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
      next(error);
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
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
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
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
      });
    }
  };

  PostBookMark = async (req, res, next) => {
    const user_id = req.decoded.id;
    const post_id = req.params.post_id;
    const target_id = req.params.user_id;

    try {
      const PostBookMark = await this.postService.PostBookMark(
        post_id,
        user_id,
        target_id
      );
      return res.status(200).json({
        success: true,
        message: '즐겨찾기 성공',
      });
    } catch (error) {
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
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
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
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
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
      });
    }
  };
}
