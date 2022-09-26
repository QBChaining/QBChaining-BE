import PostRepository from '../repositories/post.repository.js';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '../exception/customException.js';

export default class PostServices {
  postRepository = new PostRepository();
  // 최신순 정렬
  PostShowAll = async (userName, page, page_count) => {
    const post = await this.postRepository.PostShowAll(page, page_count);

    return post.map((post) => {
      let isBookmark = false;
      let isLike = false;
      for (let i = 0; i < post.PostLikes.length; i++) {
        if (post.PostLikes[i]?.userName === userName) {
          isLike = true;
        }
      }

      for (let i = 0; i < post.PostBookmarks.length; i++) {
        if (post.PostBookmarks[i]?.userName === userName) {
          isBookmark = true;
        }
      }
      let tags = post.tags.split(',');
      if (tags.length >= 4) tags.length = 3;

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        userName: post.User.userName,
        isBookmark,
        isLike,
        tags,
        cntComment: post.PostComments.length,
        like: post.like,
        profileImg: post.User.profileImg,
      };
    });
  };

  // 댓글순 정렬
  PostShowComment = async (userName, page, page_count) => {
    const postcmt = await this.postRepository.PostShowAll(page, page_count);
    return postcmt
      .map((post) => {
        let isBookmark = false;
        let isLike = false;
        for (let i = 0; i < post.PostLikes.length; i++) {
          if (post.PostLikes[i]?.userName === userName) {
            isLike = true;
          }
        }
        for (let i = 0; i < post.PostBookmarks.length; i++) {
          if (post.PostBookmarks[i]?.userName === userName) {
            isBookmark = true;
          }
        }
        let tags = post.tags.split(',');

        if (tags.length >= 4) tags.length = 3;

        return {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          userName: post.User.userName,
          isBookmark,
          isLike,
          tags,
          profileImg: post.User.profileImg,
          cntComment: post.PostComments.length,
          like: post.like,
        };
      })
      .sort(function (a, b) {
        return b.cmtNum - a.cmtNum;
      });
  };

  // 추천순 정렬
  PostShowLike = async (userName) => {
    const postshowlike = await this.postRepository.PostShowHit();

    return postshowlike
      .map((post) => {
        let isBookmark = false;
        let isLike = false;
        for (let i = 0; i < post.PostLikes.length; i++) {
          if (post.PostLikes[i]?.userName === userName) {
            isLike = true;
          }
        }
        for (let i = 0; i < post.PostBookmarks.length; i++) {
          if (post.PostBookmarks[i]?.userName === userName) {
            isBookmark = true;
          }
        }
        let tags = post.tags.split(',');

        if (tags.length >= 4) tags.length = 3;
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          userName: post.User.userName,
          isBookmark,
          isLike,
          tags,
          profileImg: post.User.profileImg,
          cntComment: post.PostComments.length,
          like: post.like,
        };
      })
      .sort((a, b) => {
        return b.like - a.like;
      });
  };

  PostShowhit = async (userName) => {
    const posthit = await this.postRepository.PostShowHit();
    const posthitmap = posthit.map((post) => {
      let isLike = false;

      for (let i = 0; i < post.PostLikes.length; i++) {
        if (post.PostLikes[i]?.userName === userName) {
          isLike = true;
        }
      }
      let tags = post.tags.split(',');

      if (tags.length >= 4) tags.length = 3;
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        tags,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        userName: post.User.userName,
        isLike,
        profileImg: post.User.profileImg,
        cmtNum: post.PostComments.length,
        like: post.like,
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
    const post = await this.postRepository.PostShowOne(postId);
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
      tags: post.tags.split(','),
      createdAt: post.createdAt,
      isBookmark,
      isLike,
      profileImg: post.User.profileImg,
      userName: post.User.userName,
      cntComment: post.PostComments.length,
      like: post.like,
    };
  };

  PostShowUser = async (userName) => {
    const post = await this.postRepository.PostShowUser(userName);

    return {
      comment: post.PostComments,
      post: post.Posts,
    };
  };

  PostCreate = async (
    title,
    content,
    tags,
    userName,
    profileImg,
    like,
    cntComment,
    isLike
  ) => {
    if (content.length === 0 || title.length === 0) {
      throw new BadRequestException('내용을 입력해주세요');
    }

    tags = tags.toString();

    const post = await this.postRepository.PostCreate(
      title,
      content,
      tags,
      userName,
      profileImg,
      like
    );

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      tags: post.tags.split(','),
      userName,
      profileImg,
      like: 0,
      cntComment,
      isLike,
    };
  };

  PostUpdate = async (title, content, userName, postId, profileImg) => {
    if (content.length === 0 || title.length === 0)
      throw new BadRequestException('내용이나 제목을 입력해주세요');
    const post1 = await this.postRepository.PostFindOne(postId);

    if (userName !== post1.userName) {
      throw new BadRequestException('본인의 글만 수정이 가능합니다');
    }

    const post = await this.postRepository.PostUpdate(
      title,
      content,
      userName,
      postId
    );
    if (post) {
      return {
        title,
        content,
        userName,
        id: parseInt(postId),
        profileImg,
      };
    }
  };

  PostDelete = async (postId, userName) => {
    const find = await this.postRepository.PostFindOne(postId);

    if (!find) throw new NotFoundException('게시물이 존재하지 않습니다');

    if (find.userName !== userName) {
      throw new NotFoundException('본인의 글만 삭제 가능합니다');
    }

    const post = await this.postRepository.PostDelete(postId, userName);

    return post;
  };

  PostLike = async (postId, userName) => {
    const findLike = await this.postRepository.PostLikeOne(postId, userName);
    if (findLike) throw new BadRequestException('이미 좋아요한 게시물입니다');
    if (!findLike) {
      const like = await this.postRepository.PostLike(postId, userName);
    }
  };

  PostLikeDelete = async (postId, userName) => {
    const findLike = await this.postRepository.PostLikeOne(postId, userName);
    if (findLike === null) {
      throw new BadRequestException('좋아요를 하지 않았습니다');
    } else {
      const like = await this.postRepository.PostLikeDestroy(postId, userName);
    }
  };

  PostBookMarkView = async (userName) => {
    const findBookMark = await this.postRepository.PostBookmarkView(userName);

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
    const findBookMark = await this.postRepository.PostBookmarkOne(
      postId,
      userName
    );

    if (findBookMark === null) {
      const bookmark = await this.postRepository.PostBookmark(postId, userName);
    } else {
      throw new BadRequestException('북마크를 이미 하였습니다');
    }
  };

  PostBookMarkDelete = async (postId, userName) => {
    const findBookMark = await this.postRepository.PostBookmarkOne(
      postId,
      userName
    );

    if (findBookMark === null) {
      throw new BadRequestException('즐겨찾기한 북마크가 없습니다');
    } else {
      const bookmark = await this.postRepository.PostBookmarkDestroy(
        postId,
        userName
      );
    }
  };

  // // 태그로 조회
  // PostTagShow = async (tag, userName) => {
  //   const posttags = await this.postRepository.PostTags(tag);

  //   // const postLists = tag.reverse();

  //   // return postLists.map((post) => {
  //   //   let isBookmark = false;
  //   //   for (let i = 0; i < post.PostBookmarks.length; i++) {
  //   //     if (post.PostBookmarks[i]?.userName === userName) {
  //   //       isBookmark = true;
  //   //     }
  //   //   }
  //   //   return {
  //   //     id: post.id,
  //   //     title: post.title,
  //   //     content: post.content,
  //   //     createdAt: post.createdAt,
  //   //     updatedAt: post.updatedAt,
  //   //     userName: post.User,
  //   //     tags: post.PostTags,
  //   //     isBookmark,
  //   //   };
  //   // });
  // };
}
