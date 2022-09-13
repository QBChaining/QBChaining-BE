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
import Notification from '../models/noti.js';
import PostTag from '../models/post_tag.js';

export default class PostServices {
  // 최신순 정렬
  PostShowAll = async (user_name) => {
    const post = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike, attributes: ['user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['created_at', 'DESC']],
    });

    return post.map((currentValue) => {
      const tag = [];
      for (let i = 0; i < currentValue.PostTags.length; i++) {
        tag.push(currentValue.PostTags[i]?.tag);
      }

      let is_bookmark = false;

      for (let i = 0; i < currentValue.PostBookmarks.length; i++) {
        if (currentValue.PostBookmarks[i]?.user_name === user_name) {
          is_bookmark = true;
        }
      }

      return {
        id: currentValue.id,
        title: currentValue.title,
        content: currentValue.content,
        created_at: currentValue.createdAt,
        updated_at: currentValue.updatedAt,
        user: currentValue.User,
        is_bookmark,
        tag,
        cmtNum: currentValue.PostComments.length,
        like: currentValue.PostLikes.length,
      };
    });
  };

  // 댓글순 정렬
  PostShowComment = async (user_name) => {
    const postcmt = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike, attributes: ['user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['created_at', 'DESC']],
    });
    return postcmt
      .map((currentValue) => {
        const tag = [];
        for (let i = 0; i < currentValue.PostTags.length; i++) {
          tag.push(currentValue.PostTags[i]?.tag);
        }

        let is_bookmark = false;

        for (let i = 0; i < currentValue.PostBookmarks.length; i++) {
          if (currentValue.PostBookmarks[i]?.user_name === user_name) {
            is_bookmark = true;
          }
        }

        return {
          id: currentValue.id,
          title: currentValue.title,
          content: currentValue.content,
          created_at: currentValue.createdAt,
          updated_at: currentValue.updatedAt,
          user: currentValue.User,
          is_bookmark,
          tag,
          cmtNum: currentValue.PostComments.length,
          like: currentValue.PostLikes.length,
        };
      })
      .sort(function (a, b) {
        return b.cmtNum - a.cmtNum;
      });
  };

  // 추천순 정렬
  PostShowLike = async (user_name) => {
    const postshowlike = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['created_at', 'DESC']],
    });

    return postshowlike
      .map((currentValue) => {
        const tag = [];
        for (let i = 0; i < currentValue.PostTags.length; i++) {
          tag.push(currentValue.PostTags[i]?.tag);
        }

        let is_bookmark = false;

        for (let i = 0; i < currentValue.PostBookmarks.length; i++) {
          if (currentValue.PostBookmarks[i]?.user_name === user_name) {
            is_bookmark = true;
          }
        }
        return {
          id: currentValue.id,
          title: currentValue.title,
          content: currentValue.content,
          created_at: currentValue.createdAt,
          updated_at: currentValue.updatedAt,
          user: currentValue.User,
          is_bookmark,
          tag,
          cmtNum: currentValue.PostComments.length,
          like: currentValue.PostLikes.length,
        };
      })
      .sort((a, b) => {
        return b.like - a.like;
      });
  };

  PostShowhit = async (user_name) => {
    const posthit = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike, attributes: ['user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['createdAt', 'DESC']],
    });

    const posthitmap = posthit.map((currentValue) => {
      const tag = [];
      for (let i = 0; i < currentValue.PostTags.length; i++) {
        tag.push(currentValue.PostTags[i]?.tag);
      }

      let is_like = false;

      for (let i = 0; i < currentValue.PostLikes.length; i++) {
        if (currentValue.PostLikes[i]?.user_name === user_name) {
          is_like = true;
        }
      }

      return {
        id: currentValue.id,
        title: currentValue.title,
        content: currentValue.content,
        tag,
        created_at: currentValue.createdAt,
        updated_at: currentValue.updatedAt,
        user: currentValue.User,
        is_like,
        cmtNum: currentValue.PostComments.length,
        like: currentValue.PostLikes.length,
      };
    });

    let posthits = [];
    let answer = [];
    let now = new Date();
    for (let i = 0; i < posthitmap.length; i++) {
      const datecompare =
        now.getTime() - new Date(posthitmap[i].created_at).getTime();
      const inttime = datecompare / 1000 / 60 / 60;
      if (parseInt(inttime) < 12) {
        posthits.push(i);
      }
    }
    for (let i = 0; i < posthits.length; i++) {
      answer.push(posthitmap[i]);
    }

    return answer.sort((a, b) => {
      return b.like - a.like;
    });
  };

  PostShowOne = async (user_name, post_id) => {
    const post = await Post.findAll({
      where: { id: post_id },
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostLike, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
    });

    return post.map((currentValue) => {
      const tag = [];
      for (let i = 0; i < currentValue.PostTags.length; i++) {
        tag.push(currentValue.PostTags[i]?.tag);
      }

      let is_bookmark = false;
      for (let i = 0; i < currentValue.PostBookmarks.length; i++) {
        if (currentValue.PostBookmarks[i]?.user_name === user_name) {
          is_bookmark = true;
        }
      }

      let is_like = false;
      for (let i = 0; i < currentValue.PostLikes.length; i++) {
        if (currentValue.PostLikes[i]?.user_name === user_name) {
          is_like = true;
        }
      }
      return {
        id: currentValue.id,
        title: currentValue.title,
        content: currentValue.content,
        tag,
        created_at: currentValue.createdAt,
        is_bookmark,
        is_like,
        user_name: currentValue.User,
        cmtNum: currentValue.PostComments.length,
        like: currentValue.PostLikes.length,
      };
    });
  };

  PostShowMy = async (user_id) => {
    const post = await Post.findAll({
      where: { user_id: user_id },
      include: [{ model: User, attributes: ['user_name'] }],
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
    });
    return post;
  };

  PostCreate = async (title, content, tags, user_name) => {
    if (content.length === 0 || title.length === 0) {
      throw new ConflictException('내용을 입력해주세요');
    }

    const postTag = [];
    const post = await Post.create({
      title,
      content,
      user_name,
    });
    for (const tag of tags) {
      const tagdata = await PostTag.create({ post_id: post.id, tag });
      postTag.push(tagdata.tag);
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      created_at: post.createdAt,
      like: 0,
      postTag,
      user_name,
    };
  };

  PostUpdate = async (title, content, tag, user_name, post_id) => {
    const post1 = await Post.findOne({
      where: { id: post_id },
    });

    if (user_name !== post1.user_name) {
      throw new ConflictException('본인의 글만 수정이 가능합니다');
    }

    if (content.length !== 0) {
      const post = await Post.update(
        { title, content, tag, user_name },
        { where: { id: post_id, user_name: user_name } }
      );
      if (post) {
        return { title, content, tag, user_name, id: parseInt(post_id) };
      }
    } else {
      throw new ConflictException('내용을 입력해주세요');
    }
    // if문써서 user_id 비교해서 내꺼아니면 수정불가처리해야댐
  };

  PostDelete = async (post_id, user_name) => {
    const find = await Post.findOne({
      where: { id: post_id },
    });
    if (find.user_name !== user_name) {
      throw new NotFoundException('본인의 글만 삭제 가능합니다');
    } else {
      const post = await Post.destroy({
        where: { id: post_id, user_name: user_name },
      });
    }
  };
  PostLikeShow = async (post_id, user_id) => {
    const findLike = await PostLike.findAll({
      where: { user_id: 1 },
    });

    return findLike;
  };

  PostLike = async (post_id, user_name) => {
    const findLike = await PostLike.findOne({
      where: { user_name: user_name, post_id: post_id },
    });
    if (findLike === null) {
      const like = await PostLike.create({ user_name, post_id });
    } else {
      throw new ConflictException('이미 좋아요한 게시물입니다');
    }
  };

  PostLikeDelete = async (post_id, user_name) => {
    const findLike = await PostLike.findOne({
      where: { user_name: user_name, post_id: post_id },
    });
    if (findLike === null) {
      throw new ConflictException('좋아요를 하지 않았습니다');
    } else {
      const like = await PostLike.destroy({
        where: { post_id: post_id, user_name: user_name },
      });
    }
  };

  PostBookMarkView = async (user_name) => {
    const findBookMark = await PostBookmark.findAll({
      where: { user_name: user_name },
      include: { model: Post, attributes: ['title', 'user_name', 'createdAt'] },
      attributes: ['post_id'],
    });

    return findBookMark.reverse();
  };

  PostBookMark = async (post_id, user_name) => {
    const findBookMark = await PostBookmark.findOne({
      where: { user_name: user_name, post_id: post_id },
    });

    if (findBookMark === null) {
      const bookmark = await PostBookmark.create({
        user_name,
        post_id,
      });
    } else {
      throw new BadRequestException('북마크를 이미 하였습니다');
    }
  };

  PostBookMarkDelete = async (post_id, user_name) => {
    const findBookMark = await PostBookmark.findOne({
      where: { user_name: user_name, post_id: post_id },
    });

    if (findBookMark === null) {
      throw new BadRequestException('즐겨찾기한 북마크가 없습니다');
    } else {
      const bookmark = await PostBookmark.destroy({
        where: { post_id: post_id, user_name: user_name },
      });
    }
  };
  // 알람을 눌렀을때 동작하는 포스트요청
  NotiCheck = async (noti_id, post_id, user_name) => {
    const findNoti = await Notification.findOne({
      where: { id: noti_id, post_id: post_id, user_name: user_name },
    });

    if (findNoti.check === false) {
      await Notification.update({ check: true }, { where: { id: noti_id } });
      return true;
    }
    if (findNoti.check === true) {
      return false;
    }

    return findNoti;
  };
  // 알람을 확인하는 겟 요청
  NotiNoti = async (user_name) => {
    const findNoti = await Notification.findAll({
      where: { user_name: user_name },
      order: [['created_at', 'DESC']],
    });

    return findNoti;
  };
}
