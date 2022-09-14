import PostCommentServices from '../services/post_comment_service.js';
import exceptionHandler from '../errorhandler/customException_handler.js';

export default class PostCommentController {
  postCommentServices = new PostCommentServices();

  CommentShowAll = async (req, res, next) => {
    const post_id = req.params.post_id;
    try {
      const postcomment = await this.postCommentServices.CommentShowAll(
        post_id
      );

      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postcomment,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  CommentCreate = async (req, res, next) => {
    const comment = req.body.comment;
    const user_name = req.decoded.name;
    const post_id = req.params.post_id;
    const profile_img = req.decoded.profile_img;
    try {
      const commentcreate = await this.postCommentServices.CommentCreate(
        comment,
        user_name,
        post_id,
        profile_img
      );
      return res.status(200).json({
        success: true,
        data: commentcreate,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  CommentUpdate = async (req, res, next) => {
    const comment = req.body.comment;
    const comment_id = req.params.comment_id;
    const user_name = req.decoded.name;
    const profile_img = req.decoded.profile_img;
    try {
      const commentUpdate = await this.postCommentServices.CommentUpdate(
        comment,
        comment_id,
        user_name,
        profile_img
      );
      return res.status(200).json({
        success: true,
        data: commentUpdate,
      });
    } catch (error) {
      const exception = exceptionHandler(error);

      res.status(exception.statusCode).json({
        success: exception.success,
        message: exception.message,
      });
    }
  };

  CommentDelete = async (req, res, next) => {
    const comment_id = req.params.comment_id;
    const user_name = req.decoded.name;
    try {
      const commentDelete = await this.postCommentServices.CommentDelete(
        comment_id,
        user_name
      );
      return res.status(200).json({
        success: true,
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
