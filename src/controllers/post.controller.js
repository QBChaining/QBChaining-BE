import PostService from '../services/post.service.js';
import exceptionHandler from '../errorhandler/customException.handler.js';

export default class PostController {
  postService = new PostService();

  PostShowAll = async (req, res, next) => {
    // 유저네임 저거 바꾸기
    const { page, page_count } = req.query;
    const userName = req.user?.userName;
    try {
      const postShowAll = await this.postService.PostShowAll(
        userName,
        page * 1,
        page_count * 1
      );
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
    const { page, page_count } = req.query;
    const userName = req.user?.userName;
    try {
      const postShowComment = await this.postService.PostShowComment(
        userName,
        page * 1,
        page_count * 1
      );
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
    const { page, page_count } = req.query;
    const userName = req.user?.userName;
    try {
      const postShowAll = await this.postService.PostShowLike(
        userName,
        page * 1,
        page_count * 1
      );
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
    const userName = req.user?.userName;
    try {
      const postShowhit = await this.postService.PostShowhit(userName);
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
    const userName = req.user?.userName;
    const postId = req.params.postId;
    try {
      const postShowOne = await this.postService.PostShowOne(userName, postId);

      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postShowOne,
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

  PostShowUser = async (req, res, next) => {
    const userName = req.params.userName;
    const userName1 = req.user?.userName;

    try {
      const PostShowMy = await this.postService.PostShowUser(
        userName,
        userName1
      );

      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: PostShowMy,
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

  PostCreate = async (req, res, next) => {
    const { title, content, tags } = req.body;
    const { userName, profileImg } = req.decoded;
    const like = 0;
    const cntComment = 0;
    const isLike = false;

    try {
      const postCreate = await this.postService.PostCreate(
        title,
        content,
        tags,
        userName,
        profileImg,
        like,
        cntComment,
        isLike
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
    const { userName, profileImg } = req.decoded;
    const { title, content } = req.body;
    const postId = req.params.postId;

    try {
      const postUpdate = await this.postService.PostUpdate(
        title,
        content,
        userName,
        postId,
        profileImg
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
    const { userName } = req.decoded;
    const postId = req.params.postId;

    try {
      const postDelete = await this.postService.PostDelete(postId, userName);
      return res.status(200).json({
        success: true,
        message: '삭제 성공',
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

  PostLike = async (req, res, next) => {
    const { userName } = req.decoded;
    const postId = req.params.postId;
    try {
      const postLike = await this.postService.PostLike(postId, userName);
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
    const { userName } = req.decoded;
    const postId = req.params.postId;
    try {
      const postLikeDelete = await this.postService.PostLikeDelete(
        postId,
        userName
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
    const { userName } = req.decoded;
    const postId = req.params.postId;

    try {
      const PostBookMark = await this.postService.PostBookMark(
        postId,
        userName
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
    const { userName } = req.decoded;
    const postId = req.params.postId;

    try {
      const PostBookMark = await this.postService.PostBookMarkDelete(
        postId,
        userName
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
    const { userName } = req.decoded;

    try {
      const PostBookMarkView = await this.postService.PostBookMarkView(
        userName
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
    const userName = req.user?.userName;
    const profileImg = req.user?.profileImg;
    try {
      const postTagShow = await this.postService.PostTagShow(
        tag,
        userName,
        profileImg
      );
      return res.status(200).json({
        success: true,
        message: 'message',
        data: postTagShow,
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
}
