import PostService from '../services/post_service.js';

export default class PostController {
  postService = new PostService();

  postShowAll = async (req, res, next) => {
    try {
      const postShowAll = await this.postService.postShowAll();
      console.log(postShowAll);
      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postShowAll,
      });
    } catch (error) {
      return next(error);
    }
  };

  postShowOne = async (req, res, next) => {
    const post_id = req.params.post_id;
    try {
      const postShowOne = await this.postService.postShowOne(post_id);

      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postShowOne,
      });
    } catch (error) {
      return next(error);
    }
  };

  postCreate = async (req, res, next) => {
    const user_id = 1;
    const title = req.body.title;
    const content = req.body.content;
    const img = 'img';

    try {
      const postCreate = await this.postService.postCreate(
        title,
        content,
        user_id,
        img
      );

      return res.status(201).json({
        success: true,
        message: '작성 성공',
      });
    } catch (error) {
      return next(error);
    }
  };

  postUpdate = async (req, res, next) => {
    const user_id = 1;
    const title = req.body.title;
    const content = req.body.content;

    try {
      const postUpdate = await this.postService.postUpdate(
        title,
        content,
        user_id
      );

      return res.status(200).json({
        success: true,
        message: '수정 성공',
      });
    } catch (error) {
      return next(error);
    }
  };

  postDelete = async (req, res, next) => {
    const user_id = 1;
    const post_id = req.params.post_id;
    try {
      const postDelete = await this.postService.postDelete(post_id, user_id);
      return res.status(200).json({
        success: true,
        message: '삭제 성공',
      });
    } catch (error) {
      return next(error);
    }
  };
}
