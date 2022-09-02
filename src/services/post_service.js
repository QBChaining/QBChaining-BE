import Post from '../models/post.js';
import User from '../models/user.js';
import PostComment from '../models/post_comment.js';
import PostLike from '../models/post_like.js';
import PostBookmark from '../models/post_bookmark.js';
import {
  CustomException,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  UnkownException,
} from '../exception/customException.js';

export default class PostServices {
  PostShowAll = async () => {
    const post = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike },
      ],
    });

    console.log(post);

    return post.map((currentValue) => {
      return {
        id: currentValue.id,
        title: currentValue.title,
        content: currentValue.content,
        tag: currentValue.tag,
        created_at: currentValue.createdAt,
        updated_at: currentValue.updatedAt,
        user: currentValue.User,
        cmtNum: currentValue.PostComments.length,
        like: currentValue.PostLikes.length,
      };
    });
  };

  PostShowOne = async (post_id) => {
    const post = await Post.findOne({
      where: { id: post_id },
      include: { model: User, attributes: ['user_name'] },
    });

    return post;
  };

  PostShowMy = async (user_id) => {
    const post = await Post.findAll({
      where: { user_id: user_id },
      include: [{ model: User, attributes: ['user_name'] }],
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
    });
    return post;
  };

  PostCreate = async (title, content, tag, user_id) => {
    // console.log(content.length);
    if (content.length !== 0) {
      const post = await Post.create({
        title,
        content,
        tag,
        user_id,
      });
      console.log(user_id);
      return post;
    } else {
      throw new ConflictException('내용을 입력해주세요');
    }
    // 로그인 안했으면 생성불가처리 해주기
  };

  PostUpdate = async (title, content, tag, user_id, post_id) => {
    if (content.length !== 0) {
      const post = await Post.update(
        { title, content, tag, user_id },
        { where: { id: post_id, user_id: user_id } }
      );
      return post;
    } else {
      throw new ConflictException('내용을 입력해주세요');
    }
    // if문써서 user_id 비교해서 내꺼아니면 수정불가처리해야댐
  };

  PostDelete = async (post_id, user_id) => {
    const post = await Post.destroy({
      where: { id: post_id, user_id: user_id },
    });

    return post;
    // if문써서 user_id 비교해서 내꺼아니면 삭제불가처리해야댐
  };

  PostLike = async (post_id, user_id) => {
    const findLike = await PostLike.findOne({
      where: { user_id: user_id, post_id: post_id },
    });
    console.log(post_id);
    console.log(user_id);
    console.log(findLike);
    if (findLike === null) {
      const like = await PostLike.create({ user_id, post_id });
    } else {
      throw new ConflictException('이미 좋아요한 게시물입니다');
    }
  };

  PostLikeDelete = async (post_id, user_id) => {
    const findLike = await PostLike.findOne({
      where: { user_id: user_id, post_id: post_id },
    });
    console.log(findLike);
    if (findLike === null) {
      throw new ConflictException('좋아요를 하지 않았습니다');
    } else {
      const like = await PostLike.destroy({
        where: { post_id: post_id, user_id: user_id },
      });
    }
  };

  PostBookMarkView = async (post_id, user_id) => {
    const findBookMark = await PostBookmark.findAll({
      where: { post_id: post_id, user_id: user_id },
      include: { model: Post, attributes: ['title'] },
      attributes: ['user_id'],
    });
    return findBookMark;
  };

  PostBookMark = async (post_id, user_id) => {
    const findBookMark = await PostBookmark.findOne({
      where: { user_id: user_id, post_id: post_id },
    });
    // console.log(findBookMark.user_id);

    if (findBookMark === null) {
      const bookmark = await PostBookmark.create({
        user_id,
        post_id,
      });
    } else {
      throw new BadRequestException('북마크를 이미 하였습니다');
    }
  };

  PostBookMarkDelete = async (post_id, user_id) => {
    const findBookMark = await PostBookmark.findOne({
      where: { user_id: user_id, post_id: post_id },
    });

    if (findBookMark === null) {
      throw new BadRequestException('즐겨찾기한 북마크가 없습니다');
    } else {
      const bookmark = await PostBookmark.destroy({
        where: { post_id: post_id, user_id: user_id },
      });
    }
  };
}
