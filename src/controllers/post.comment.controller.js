import PostCommentServices from '../services/post.comment.service.js';
import exceptionHandler from '../errorhandler/customException.handler.js';

export default class PostCommentController {
  postCommentServices = new PostCommentServices();

  CommentShowAll = async (req, res, next) => {
    const postId = req.params.postId;
    try {
      const postcomment = await this.postCommentServices.CommentShowAll(postId);

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
    const { userName, profileImg } = req.decoded;
    const postId = req.params.postId;

    try {
      const commentcreate = await this.postCommentServices.CommentCreate(
        comment,
        userName,
        postId,
        profileImg
      );
      return res.status(200).json({
        success: true,
        data: commentcreate,
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

  CommentUpdate = async (req, res, next) => {
    const comment = req.body.comment;
    const commentId = req.params.commentId;
    const { userName, profileImg } = req.decoded;
    try {
      const commentUpdate = await this.postCommentServices.CommentUpdate(
        comment,
        commentId,
        userName,
        profileImg
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
    const commentId = req.params.commentId;
    const userName = req.decoded.userName;
    try {
      const commentDelete = await this.postCommentServices.CommentDelete(
        commentId,
        userName
      );
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
}
