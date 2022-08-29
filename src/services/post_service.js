import Post from '../models/post.js';
import User from '../models/user.js';

export default class PostServices {
  postShowAll = async () => {
    const post = await Post.findAll({
      where: {},
      include: [{ model: User, attributes: ['nickname'] }],
    });
  };

  postCreate = async (title, content, img) => {
    const post = await Post.create({
      title,
      content,
      img,
    });
  };

  // postupdate = async (title, content, ) => {};
}
