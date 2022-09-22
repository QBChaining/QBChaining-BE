// 시퀄라이즈 생성하기위한 인덱스.js
export * from './sequelize.js';
import sequelize from './sequelize.js';

// 유저, 포스트, 댓글, 좋아요 임포트
import User from './user.js';
import UserInfo from './user.info.js';
import Job from './job.js';
import Language from './language.js';
import PostComment from './post.comment.js';
import Post from './post.js';
import Qna from './qna.js';
import QnaComment from './qna.comment.js';
import PostLike from './post.like.js';
import QnaLike from './qna.like.js';
import QnaCommentLike from './qna.comment.like.js';

import QnaBookmark from './qna.bookmark.js';
import PostBookmark from './post.bookmark.js';
import Notification from './noti.js';
import PostTag from './post.tag.js';

const db = {};

db.sequelize = sequelize;
db.user = User;
db.userInfo = UserInfo;
db.job = Job;
db.language = Language;
db.post = Post;
db.postComment = PostComment;
db.postLike = PostLike;
db.postBookmark = PostBookmark;
db.qna = Qna;
db.qnaComment = QnaComment;
db.qnaLike = QnaLike;
db.qnaCommentLike = QnaCommentLike;

db.qnaBookmark = QnaBookmark;
db.notification = Notification;
db.postTag = PostTag;

User.init(sequelize);
UserInfo.init(sequelize);
Job.init(sequelize);
Language.init(sequelize);
Post.init(sequelize);
PostComment.init(sequelize);
PostLike.init(sequelize);
PostBookmark.init(sequelize);
Qna.init(sequelize);
QnaComment.init(sequelize);
QnaLike.init(sequelize);
QnaCommentLike.init(sequelize);

QnaBookmark.init(sequelize);
Notification.init(sequelize);
PostTag.init(sequelize);

User.associate(db);
UserInfo.associate(db);
Job.associate(db);
Language.associate(db);
Post.associate(db);
PostComment.associate(db);
PostLike.associate(db);
PostBookmark.associate(db);
Qna.associate(db);
QnaComment.associate(db);
QnaLike.associate(db);
QnaCommentLike.associate(db);

QnaBookmark.associate(db);
Notification.associate(db);
PostTag.associate(db);

export { db };
