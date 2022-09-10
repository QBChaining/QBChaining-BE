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

export default class PostServices {
  // 최신순 정렬
  PostShowAll = async () => {
    const post = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike },
        { model: PostBookmark },
      ],
      order: [['created_at', 'DESC']],
    });

    return post.map((currentValue) => {
      return {
        id: currentValue.id,
        title: currentValue.title,
        content: currentValue.content,
        tag: currentValue.tag,
        created_at: currentValue.createdAt,
        updated_at: currentValue.updatedAt,
        user: currentValue.User,
        // is_bookmark: currentValue.PostBookmarks
        cmtNum: currentValue.PostComments.length,
        like: currentValue.PostLikes.length,
      };
    });
  };

  // 댓글순 정렬
  PostShowComment = async () => {
    const postcmt = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike },
      ],
    });
    return postcmt
      .map((currentValue) => {
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
      })
      .sort(function (a, b) {
        return b.cmtNum - a.cmtNum;
      });
  };

  // 추천순 정렬
  PostShowLike = async () => {
    const postshowlike = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike },
      ],
    });

    return postshowlike
      .map((currentValue) => {
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
      })
      .sort((a, b) => {
        return b.like - a.like;
      });
  };

  PostShowhit = async () => {
    const posthit = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike },
      ],
    });

    const posthitmap = posthit.map((currentValue) => {
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

  PostShowOne = async (post_id) => {
    const post = await Post.findOne({
      where: { id: post_id },
      include: [
        { model: User, attributes: ['user_name'] },
        { model: PostBookmark },
      ],
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
    if (content.length === 0 || title.length === 0) {
      throw new ConflictException('내용을 입력해주세요');
    }

    const post = await Post.create({
      title,
      content,
      tag,
      user_id,
    });
  };

  PostUpdate = async (title, content, tag, user_id, post_id) => {
    const post1 = await Post.findOne({
      where: { id: post_id },
    });

    if (user_id !== post1.user_id) {
      throw new ConflictException('본인의 글만 수정이 가능합니다');
    }

    if (content.length !== 0) {
      const post = await Post.update(
        { title, content, tag, user_id },
        { where: { id: post_id, user_id: user_id } }
      );
      if (post) {
        return { title, content, tag, user_id, id: parseInt(post_id) };
      }
    } else {
      throw new ConflictException('내용을 입력해주세요');
    }
    // if문써서 user_id 비교해서 내꺼아니면 수정불가처리해야댐
  };

  PostDelete = async (post_id, user_id) => {
    const find = await Post.findOne({
      where: { id: post_id },
    });
    if (find.user_id !== user_id) {
      throw new NotFoundException('본인의 글만 삭제 가능합니다');
    } else {
      const post = await Post.destroy({
        where: { id: post_id, user_id: user_id },
      });
    }
  };
  PostLikeShow = async (post_id, user_id) => {
    const findLike = await PostLike.findAll({
      where: { user_id: 1 },
    });

    return findLike;
  };

  PostLike = async (post_id, user_id) => {
    const findLike = await PostLike.findOne({
      where: { user_id: user_id, post_id: post_id },
    });
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
  // 알람을 눌렀을때 동작하는 포스트요청
  NotiCheck = async (noti_id, post_id, user_id) => {
    const findNoti = await Notification.findOne({
      where: { id: noti_id, post_id: post_id, user_id: user_id },
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
  NotiNoti = async (noti_id, post_id, user_id) => {
    const findNoti = await Notification.findAll({
      where: { user_id: user_id },
    });

    // let arr = [];
    // for (let i = 0; i < findNoti.length; i++) {
    //   if (findNoti[i].check === true) {
    //     arr.push(i);
    //   }
    // }
    // console.log(arr);

    // const notimap = findNoti.map((currentValue) => {
    //   return {
    //     id: currentValue.id,
    //     data: currentValue.data,
    //     created_at: currentValue.created_at,
    //     check: currentValue.check,
    //     post_id: currentValue.post_id,
    //     user_id: currentValue.user_id,
    //   };
    // });

    return findNoti;
  };
}
