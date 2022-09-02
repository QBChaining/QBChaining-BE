import PostCommentServices from '../services/post_comment_service.js';
import exceptionHandler from '../errorhandler/customexception_handler.js';

export default class PostCommentController {
  postCommentServices = new PostCommentServices();

  CommentShowAll = async (req, res, next) => {
    const post_id = req.params.post_id;
    try {
      const postcomment = await this.postCommentServices.CommentShowAll(
        post_id
      );
      console.log(postcomment);

      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postcomment,
      });
    } catch (error) {
      const errorhandler = exceptionHandler(error);
      console.log(errorhandler);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
      });
    }
  };

  CommentCreate = async (req, res, next) => {
    const comment = req.body.comment;
    const user_name = 2;
    const post_id = req.params.post_id;
    try {
      const commentcreate = await this.postCommentServices.CommentCreate(
        comment,
        user_name,
        post_id
      );
      console.log(commentcreate);
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      const errorhandler = exceptionHandler(error);
      console.log(errorhandler);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
      });
    }
  };

  CommentUpdate = async (req, res, next) => {
    const comment = req.body.comment;
    const comment_id = req.params.comment_id;
    const user_name = 2;
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
      console.log(errorhandler);

      res.status(errorhandler.statusCode).json({
        success: errorhandler.success,
        message: errorhandler.message,
      });
    }
  };

  CommentDelete = async (req, res, next) => {
    const comment_id = req.params.comment_id;
    const user_name = 2;
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
