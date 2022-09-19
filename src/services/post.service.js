import Post from '../models/post.js';
import User from '../models/user.js';
import PostComment from '../models/post.comment.js';
import PostLike from '../models/post.like.js';
import PostBookmark from '../models/post.bookmark.js';
import PostTag from '../models/post.tag.js';
import {
  BadRequestException,
  ConflictException,
} from '../exception/customException.js';

export default class PostServices {
  // 최신순 정렬
  PostShowAll = async (userName) => {
    const post = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName', 'comment'] },
        { model: PostLike, attributes: ['userName'] },
        { model: PostBookmark, attributes: ['userName'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['createdAt', 'DESC']],
    });
    console.log(post);

    return post.map((post) => {
      const postTag = [];
      for (let i = 0; i < post.PostTags.length; i++) {
        postTag.push(post.PostTags[i]?.postTag);
      }

      let isBookmark = false;

      for (let i = 0; i < post.PostBookmarks.length; i++) {
        if (post.PostBookmarks[i]?.userName === userName) {
          isBookmark = true;
        }
      }

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        userName: post.User.userName,
        isBookmark,
        postTag,
        cntComment: post.PostComments.length,
        like: post.PostLikes.length,
        profileImg: post.User.profileImg,
      };
    });
  };

  // 댓글순 정렬
  PostShowComment = async (userName) => {
    const postcmt = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName', 'comment'] },
        { model: PostLike, attributes: ['userName'] },
        { model: PostBookmark, attributes: ['userName'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['createdAt', 'DESC']],
    });
    return postcmt
      .map((post) => {
        const postTag = [];
        for (let i = 0; i < post.PostTags.length; i++) {
          postTag.push(post.PostTags[i]?.postTag);
        }

        let isBookmark = false;

        for (let i = 0; i < post.PostBookmarks.length; i++) {
          if (post.PostBookmarks[i]?.userName === userName) {
            isBookmark = true;
          }
        }

        return {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          userName: post.User.userName,
          isBookmark,
          postTag,
          profileImg: post.User.profileImg,
          cntComment: post.PostComments.length,
          like: post.PostLikes.length,
        };
      })
      .sort(function (a, b) {
        return b.cmtNum - a.cmtNum;
      });
  };

  // 추천순 정렬
  PostShowLike = async (userName) => {
    const postshowlike = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName', 'comment'] },
        { model: PostLike },
        { model: PostBookmark, attributes: ['userName'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['createdAt', 'DESC']],
    });

    return postshowlike
      .map((post) => {
        const tag = [];
        for (let i = 0; i < post.PostTags.length; i++) {
          tag.push(post.PostTags[i]?.tag);
        }

        let isBookmark = false;

        for (let i = 0; i < post.PostBookmarks.length; i++) {
          if (post.PostBookmarks[i]?.userName === userName) {
            isBookmark = true;
          }
        }
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          userName: post.User.userName,
          isBookmark,
          tag,
          profileImg: post.User.profileImg,
          cntComment: post.PostComments.length,
          like: post.PostLikes.length,
        };
      })
      .sort((a, b) => {
        return b.like - a.like;
      });
  };

  PostShowhit = async (userName) => {
    const posthit = await Post.findAll({
      where: {},
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName', 'comment'] },
        { model: PostLike, attributes: ['userName'] },
        { model: PostBookmark, attributes: ['userName'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      order: [['createdAt', 'DESC']],
    });

    const posthitmap = posthit.map((post) => {
      const postTag = [];
      for (let i = 0; i < post.PostTags.length; i++) {
        postTag.push(post.PostTags[i]?.postTag);
      }

      let isLike = false;

      for (let i = 0; i < post.PostLikes.length; i++) {
        if (post.PostLikes[i]?.userName === userName) {
          isLike = true;
        }
      }

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        tag,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        userName: post.User.userName,
        isLike,
        profileImg: post.User.profileImg,
        cmtNum: post.PostComments.length,
        like: post.PostLikes.length,
      };
    });

    let posthits = [];
    let answer = [];
    let now = new Date();
    for (let i = 0; i < posthitmap.length; i++) {
      const datecompare =
        now.getTime() - new Date(posthitmap[i].createdAt).getTime();
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

  PostShowOne = async (userName, postId) => {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User, attributes: ['userName', 'profileImg'] },
        { model: PostComment, attributes: ['userName'] },
        { model: PostBookmark, attributes: ['userName'] },
        { model: PostLike, attributes: ['userName'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
    });

    return post.map((post) => {
      const postTag = [];
      for (let i = 0; i < post.PostTags.length; i++) {
        postTag.push(post.PostTags[i]?.postTag);
      }

      let isBookmark = false;
      for (let i = 0; i < post.PostBookmarks.length; i++) {
        if (post.PostBookmarks[i]?.userName === userName) {
          isBookmark = true;
        }
      }

      let isLike = false;
      for (let i = 0; i < post.PostLikes.length; i++) {
        if (post.PostLikes[i]?.userName === userName) {
          isLike = true;
        }
      }
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        postTag,
        created_at: post.createdAt,
        isBookmark,
        isLike,
        profileImg: post.User.profileImg,
        userName: post.User.userName,
        cntComment: post.PostComments.length,
        like: post.PostLikes.length,
      };
    });
  };

  PostShowMy = async (userName, userName1, profileImg) => {
    const post = await Post.findAll({
      where: { userName: userName },
      include: [
        { model: PostLike, attributes: ['userName'] },
        { model: PostTag, attributes: ['tag'], raw: true },
      ],
      attributes: [
        'id',
        'title',
        'content',
        'createdAt',
        'updatedAt',
        'userName',
      ],
      order: [['createdAt', 'DESC']],
    });

    return post.map((post) => {
      const postTag = [];
      for (let i = 0; i < post.PostTags.length; i++) {
        postTag.push(post.PostTags[i]?.postTag);
      }

      let isLike = false;

      for (let i = 0; i < post.PostLikes.length; i++) {
        if (post.PostLikes[i]?.userName === userName1) {
          isLike = true;
        }
      }
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        userName: post.userName,
        postTag,
        isLike,
        profileImg: post.User.profileImg,
      };
    });
  };

  PostCreate = async (title, content, tags, userName, profileImg) => {
    if (content.length === 0 || title.length === 0) {
      throw new ConflictException('내용을 입력해주세요');
    }

    const postTag = [];
    const post = await Post.create({
      title,
      content,
      userName,
    });
    for (const tag of tags) {
      const tagdata = await PostTag.create({ postId: post.id, tag });
      postTag.push(tagdata.tag);
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      created_at: post.createdAt,
      postTag,
      userName,
      profileImg,
    };
  };

  PostUpdate = async (title, content, tag, userName, postId, profileImg) => {
    if (content.length === 0 || title.length === 0)
      throw new ConflictException('내용이나 제목을 입력해주세요');
    const post1 = await Post.findOne({
      where: { id: postId },
    });

    if (userName !== post1.userName) {
      throw new ConflictException('본인의 글만 수정이 가능합니다');
    }

    const post = await Post.update(
      { title, content, tag, userName },
      { where: { id: postId, userName: userName } }
    );
    if (post) {
      return {
        title,
        content,
        tag,
        userName,
        id: parseInt(postId),
        profileImg,
      };
    }
  };

  PostDelete = async (postId, userName) => {
    const find = await Post.findOne({
      where: { id: postId },
    });

    if (!find) throw new BadRequestException('게시물이 존재하지 않습니다');

    if (find.userName !== userName) {
      throw new NotFoundException('본인의 글만 삭제 가능합니다');
    } else {
      const post = await Post.destroy({
        where: { id: postId, userName: userName },
      });
    }
  };
  PostLikeShow = async (userName) => {
    const findLike = await PostLike.findAll({
      where: { userName: userName },
    });
    return findLike;
  };

  PostLike = async (postId, userName) => {
    const findLike = await PostLike.findOne({
      where: { userName: userName, postId: postId },
    });
    if (findLike === null) {
      const like = await PostLike.create({ userName, postId });
    } else {
      throw new ConflictException('이미 좋아요한 게시물입니다');
    }
  };

  PostLikeDelete = async (postId, userName) => {
    const findLike = await PostLike.findOne({
      where: { userName: userName, postId: postId },
    });
    if (findLike === null) {
      throw new ConflictException('좋아요를 하지 않았습니다');
    } else {
      const like = await PostLike.destroy({
        where: { postId: postId, userName: userName },
      });
    }
  };

  PostBookMarkView = async (userName) => {
    const findBookMark = await PostBookmark.findAll({
      where: { userName: userName },
      include: {
        model: Post,
        attributes: ['title', 'userName', 'createdAt', 'id'],
      },
      attributes: [],
    });

    return findBookMark.map((bookmark) => {
      return {
        id: bookmark.Post.id,
        title: bookmark.Post.title,
        createdAt: bookmark.Post.createdAt,
        userName: bookmark.Post.userName,
      };
    });
  };

  PostBookMark = async (postId, userName) => {
    const findBookMark = await PostBookmark.findOne({
      where: { userName: userName, postId: postId },
    });

    if (findBookMark === null) {
      const bookmark = await PostBookmark.create({
        userName,
        postId,
      });
    } else {
      throw new BadRequestException('북마크를 이미 하였습니다');
    }
  };

  PostBookMarkDelete = async (postId, userName) => {
    const findBookMark = await PostBookmark.findOne({
      where: { userName: userName, postId: postId },
    });

    if (findBookMark === null) {
      throw new BadRequestException('즐겨찾기한 북마크가 없습니다');
    } else {
      const bookmark = await PostBookmark.destroy({
        where: { postId: postId, userName: userName },
      });
    }
  };

  // 태그로 조회
  PostTagShow = async (tag, userName) => {
    const findTag = await PostTag.findAll({
      where: { tag: tag },
    });
    const postList = [];
    for (let i = 0; i < findTag.length; i++) {
      const post = await Post.findOne({
        where: { id: findTag[i].postId },
        include: [
          { model: PostTag, attributes: ['tag'], raw: true },
          { model: PostBookmark, attributes: ['userName'] },
        ],
      });
      postList.push(post);
    }

    const postLists = postList.reverse();

    return postLists.map((post) => {
      let is_bookmark = false;
      for (let i = 0; i < post.PostBookmarks.length; i++) {
        if (post.PostBookmarks[i]?.userName === userName) {
          is_bookmark = true;
        }
      }
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        created_at: post.createdAt,
        updated_at: post.updatedAt,
        userName: post.User,
        tag: post.PostTags,
        is_bookmark,
      };
    });
  };
}
