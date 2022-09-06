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
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
      });
    }
  };

  CommentCreate = async (req, res, next) => {
    const comment = req.body.comment;
    const user_name = req.decoded.name;
    const post_id = req.params.post_id;
    try {
      const commentcreate = await this.postCommentServices.CommentCreate(
        comment,
        user_name,
        post_id
      );
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
      });
    }
  };

  CommentUpdate = async (req, res, next) => {
    const comment = req.body.comment;
    const comment_id = req.params.comment_id;
    const user_name = req.decoded.name;
    try {
      const commentUpdate = await this.postCommentServices.CommentUpdate(
        comment,
        comment_id,
        user_name
      );
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      const errorhandler = exceptionHandler(error);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
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
      return next(error);
    }
  };
}
