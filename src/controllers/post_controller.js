import PostService from '../services/post_service.js';
import exceptionHandler from '../errorhandler/customException_handler.js';

export default class PostController {
  postService = new PostService();

  PostShowAll = async (req, res, next) => {
    const user_name = req.user?.name;
    try {
      const postShowAll = await this.postService.PostShowAll(user_name);
      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postShowAll,
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

  PostShowComment = async (req, res, next) => {
    const user_name = req.user?.name;
    try {
      const postShowComment = await this.postService.PostShowComment(user_name);
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
    const user_name = req.user?.name;
    try {
      const postShowAll = await this.postService.PostShowLike(user_name);
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
    const user_name = req.user?.name;
    try {
      const postShowhit = await this.postService.PostShowhit(user_name);
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
    const user_name = req.user?.name;
    const post_id = req.params.post_id;
    try {
      const postShowOne = await this.postService.PostShowOne(
        user_name,
        post_id
      );

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
    const user_name = req.params.user_name;
    const user_name1 = req.user?.name;
    const profile_img = req.user?.profile_img;
    try {
      const PostShowMy = await this.postService.PostShowMy(
        user_name,
        user_name1,
        profile_img
      );

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
    const { title, content, tag } = req.body;
    const user_name = req.decoded.name;
    const profile_img = req.decoded.profile_img;
    try {
      const postCreate = await this.postService.PostCreate(
        title,
        content,
        tag,
        user_name,
        profile_img
      );
      return res.status(200).json({
        success: true,
        message: '작성 성공',
        data: postCreate,
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

  PostUpdate = async (req, res, next) => {
    const user_name = req.decoded.name;
    const title = req.body.title;
    const content = req.body.content;
    const tag = req.body.tag;
    const post_id = req.params.post_id;
    const profile_img = req.decoded.profile_img;

    try {
      const postUpdate = await this.postService.PostUpdate(
        title,
        content,
        tag,
        user_name,
        post_id,
        profile_img
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
    const user_name = req.decoded.name;
    const post_id = req.params.post_id;

    try {
      const postDelete = await this.postService.PostDelete(post_id, user_name);
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
    const user_name = req.decoded.name;
    try {
      const post = await this.postService.PostLikeShow(user_name);
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
    const user_name = req.decoded.name;
    const post_id = req.params.post_id;
    try {
      const postLike = await this.postService.PostLike(post_id, user_name);
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
    const user_name = req.decoded.name;
    const post_id = req.params.post_id;
    try {
      const postLikeDelete = await this.postService.PostLikeDelete(
        post_id,
        user_name
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
    const user_name = req.decoded.name;
    const post_id = req.params.post_id;

    try {
      const PostBookMark = await this.postService.PostBookMark(
        post_id,
        user_name
      );
      return res.status(200).json({
        success: true,
        message: '즐겨찾기 성공',
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  PostBookMarkDelete = async (req, res, next) => {
    const user_name = req.decoded.name;
    const post_id = req.params.post_id;

    try {
      const PostBookMark = await this.postService.PostBookMarkDelete(
        post_id,
        user_name
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
    const user_name = req.decoded.name;

    try {
      const PostBookMarkView = await this.postService.PostBookMarkView(
        user_name
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

  PostTagShow = async (req, res, next) => {
    const tag = req.query.tag;
    const user_name = req.user?.name;
    const profile_img = req.user.profile_img;
    try {
      const postTagShow = await this.postService.PostTagShow(
        tag,
        user_name,
        profile_img
      );
      return res.status(200).json({
        success: true,
        message: 'message',
        data: postTagShow,
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
