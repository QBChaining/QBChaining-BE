import Post from '../models/post.js';
import User from '../models/user.js';
import PostComment from '../models/post_comment.js';
import PostLike from '../models/post_like.js';
import PostBookmark from '../models/post_bookmark.js';
import PostTag from '../models/post_tag.js';
import {
  BadRequestException,
  ConflictException,
} from '../exception/customException.js';

export default class PostServices {
  // 최신순 정렬
  PostShowAll = async (user_name) => {
    const post = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name', 'profile_img'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike, attributes: ['user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['created_at', 'DESC']],
    });

    return post.map((post) => {
      const tag = [];
      for (let i = 0; i < post.PostTags.length; i++) {
        tag.push(post.PostTags[i]?.tag);
      }

      let is_bookmark = false;

      for (let i = 0; i < post.PostBookmarks.length; i++) {
        if (post.PostBookmarks[i]?.user_name === user_name) {
          is_bookmark = true;
        }
      }

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        created_at: post.createdAt,
        updated_at: post.updatedAt,
        user_name: post.User.user_name,
        is_bookmark,
        tag,
        cmtNum: post.PostComments.length,
        like: post.PostLikes.length,
        profile_img: post.User.profile_img,
      };
    });
  };

  // 댓글순 정렬
  PostShowComment = async (user_name) => {
    const postcmt = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['user_name', 'profile_img'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike, attributes: ['user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['created_at', 'DESC']],
    });
    return postcmt
      .map((posting) => {
        const tag = [];
        for (let i = 0; i < posting.PostTags.length; i++) {
          tag.push(posting.PostTags[i]?.tag);
        }

        let is_bookmark = false;

        for (let i = 0; i < posting.PostBookmarks.length; i++) {
          if (posting.PostBookmarks[i]?.user_name === user_name) {
            is_bookmark = true;
          }
        }

        return {
          id: posting.id,
          title: posting.title,
          content: posting.content,
          created_at: posting.createdAt,
          updated_at: posting.updatedAt,
          user_name: posting.User.user_name,
          is_bookmark,
          tag,
          profile_img: posting.User.profile_img,
          cmtNum: posting.PostComments.length,
          like: posting.PostLikes.length,
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
        { model: User, attributes: ['user_name', 'profile_img'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['created_at', 'DESC']],
    });

    return postshowlike
      .map((posting) => {
        const tag = [];
        for (let i = 0; i < posting.PostTags.length; i++) {
          tag.push(posting.PostTags[i]?.tag);
        }

        let is_bookmark = false;

        for (let i = 0; i < posting.PostBookmarks.length; i++) {
          if (posting.PostBookmarks[i]?.user_name === user_name) {
            is_bookmark = true;
          }
        }
        return {
          id: posting.id,
          title: posting.title,
          content: posting.content,
          created_at: posting.createdAt,
          updated_at: posting.updatedAt,
          user_name: posting.User.user_name,
          is_bookmark,
          tag,
          profile_img: posting.User.profile_img,
          cmtNum: posting.PostComments.length,
          like: posting.PostLikes.length,
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
        { model: User, attributes: ['user_name', 'profile_img'] },
        { model: PostComment, attributes: ['user_name', 'comment'] },
        { model: PostLike, attributes: ['user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['createdAt', 'DESC']],
    });

    const posthitmap = posthit.map((posting) => {
      const tag = [];
      for (let i = 0; i < posting.PostTags.length; i++) {
        tag.push(posting.PostTags[i]?.tag);
      }

      let is_like = false;

      for (let i = 0; i < posting.PostLikes.length; i++) {
        if (posting.PostLikes[i]?.user_name === user_name) {
          is_like = true;
        }
      }

      return {
        id: posting.id,
        title: posting.title,
        content: posting.content,
        tag,
        created_at: posting.createdAt,
        updated_at: posting.updatedAt,
        user_name: posting.User.user_name,
        is_like,
        profile_img: posting.User.profile_img,
        cmtNum: posting.PostComments.length,
        like: posting.PostLikes.length,
      };
    });

    let posthits = [];
    let answer = [];
    let now = new Date();
    for (let i = 0; i < posthitmap.length; i++) {
      const datecompare =
        now.getTime() - new Date(posthitmap[i].created_at).getTime();
      const inttime = datecompare / 1000 / 60 / 60;
      if (parseInt(inttime) < 24) {
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
        { model: User, attributes: ['user_name', 'profile_img'] },
        { model: PostComment, attributes: ['user_name'] },
        { model: PostBookmark, attributes: ['user_name'] },
        { model: PostLike, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
    });

    return post.map((posting) => {
      const tag = [];
      for (let i = 0; i < posting.PostTags.length; i++) {
        tag.push(posting.PostTags[i]?.tag);
      }

      let is_bookmark = false;
      for (let i = 0; i < posting.PostBookmarks.length; i++) {
        if (posting.PostBookmarks[i]?.user_name === user_name) {
          is_bookmark = true;
        }
      }

      let is_like = false;
      for (let i = 0; i < posting.PostLikes.length; i++) {
        if (posting.PostLikes[i]?.user_name === user_name) {
          is_like = true;
        }
      }
      return {
        id: posting.id,
        title: posting.title,
        content: posting.content,
        tag,
        created_at: posting.createdAt,
        is_bookmark,
        is_like,
        profile_img: posting.User.profile_img,
        user_name: posting.User.user_name,
        cmtNum: posting.PostComments.length,
        like: posting.PostLikes.length,
      };
    });
  };

  PostShowMy = async (user_name, user_name1, profile_img) => {
    const post = await Post.findAll({
      where: { user_name: user_name },
      include: [
        { model: PostLike, attributes: ['user_name'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      attributes: [
        'id',
        'title',
        'content',
        'createdAt',
        'updatedAt',
        'user_name',
      ],
      order: [['createdAt', 'DESC']],
    });

    return post.map((posting) => {
      const tag = [];
      for (let i = 0; i < posting.PostTags.length; i++) {
        tag.push(posting.PostTags[i]?.tag);
      }

      let is_like = false;

      for (let i = 0; i < posting.PostLikes.length; i++) {
        if (posting.PostLikes[i]?.user_name === user_name1) {
          is_like = true;
        }
      }
      return {
        id: posting.id,
        title: posting.title,
        content: posting.content,
        created_at: posting.createdAt,
        updated_at: posting.updatedAt,
        user_name: posting.user_name,
        tag,
        is_like,
        profile_img: posting.User.profile_img,
      };
    });
  };

  PostCreate = async (title, content, tags, user_name, profile_img) => {
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
      profile_img,
    };
  };

  PostUpdate = async (title, content, tag, user_name, post_id, profile_img) => {
    if (content.length === 0 || title.length === 0)
      throw new ConflictException('내용이나 제목을 입력해주세요');
    const post1 = await Post.findOne({
      where: { id: post_id },
    });

    if (user_name !== post1.user_name) {
      throw new ConflictException('본인의 글만 수정이 가능합니다');
    }

    const post = await Post.update(
      { title, content, tag, user_name },
      { where: { id: post_id, user_name: user_name } }
    );
    if (post) {
      return {
        title,
        content,
        tag,
        user_name,
        id: parseInt(post_id),
        profile_img,
      };
    }
  };

  PostDelete = async (post_id, user_name) => {
    const find = await Post.findOne({
      where: { id: post_id },
    });

    if (!find) throw new BadRequestException('게시물이 존재하지 않습니다');

    if (find.user_name !== user_name) {
      throw new NotFoundException('본인의 글만 삭제 가능합니다');
    } else {
      const post = await Post.destroy({
        where: { id: post_id, user_name: user_name },
      });
    }
  };
  PostLikeShow = async (user_name) => {
    const findLike = await PostLike.findAll({
      where: { user_name: user_name },
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
      include: {
        model: Post,
        attributes: ['title', 'user_name', 'createdAt', 'id'],
      },
      attributes: [],
    });

    return findBookMark.map((bookmark) => {
      return {
        id: bookmark.Post.id,
        title: bookmark.Post.title,
        createdAt: bookmark.Post.createdAt,
        user_name: bookmark.Post.user_name,
      };
    });
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

  // 태그로 조회
  PostTagShow = async (tag, user_name) => {
    const findTag = await PostTag.findAll({
      where: { tag: tag },
    });
    const postList = [];
    for (let i = 0; i < findTag.length; i++) {
      const post = await Post.findOne({
        where: { id: findTag[i].post_id },
        include: [
          { model: PostTag, attributes: ['tag'], raw: true },
          { model: PostBookmark, attributes: ['user_name'] },
        ],
      });
      postList.push(post);
    }

    const postLists = postList.reverse();

    return postLists.map((post) => {
      let is_bookmark = false;
      for (let i = 0; i < post.PostBookmarks.length; i++) {
        if (post.PostBookmarks[i]?.user_name === user_name) {
          is_bookmark = true;
        }
      }
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        created_at: post.createdAt,
        updated_at: post.updatedAt,
        user_name: post.User,
        tag: post.PostTags,
        is_bookmark,
      };
    });
  };
}
