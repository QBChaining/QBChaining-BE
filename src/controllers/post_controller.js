import PostService from '../services/post_service';

export default class PostController {
  postService = new PostService();

  postShowAll = async (req, res, next) => {
    try {
      const postShowAll = await postService.postShowAll();
      return res.status(200).json({
        success: true,
        message: '조회 성공',
        data: postShowAll,
      });
    } catch (error) {
      return next(error);
    }
  };
}
