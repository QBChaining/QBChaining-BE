import Post from '../models/post.js';
import User from '../models/user.js';

export default class PostServices {
  postShowAll = async () => {
    const post = await Post.findAll({
      where: {},
      // 인크루드
    });

    return post;
  };

  postShowOne = async (post_id) => {
    const post = await Post.findOne({
      where: { id: post_id },
      // 인크루드
    });

    return post;
  };

  postCreate = async (title, content, user_id, img) => {
    const post = await Post.create({
      title,
      content,
      user_id,
      img,
    });

    return post;
  };

  postUpdate = async (title, content, user_id, img) => {
    const post = await Post.update(
      { title, content },
      { where: { id: post_id, user_id: user_id } }
    );
    return post;
  };

  postDelete = async (post_id, user_id) => {
    const post = await Post.destroy({
      where: { id: post_id, user_id: user_id },
    });

    return post;
  };
}
