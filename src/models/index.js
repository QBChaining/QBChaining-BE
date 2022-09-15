// 시퀄라이즈 생성하기위한 인덱스.js
export * from './sequelize.js';
import sequelize from './sequelize.js';

// 유저, 포스트, 댓글, 좋아요 임포트
import User from './user.js';
import UserInfo from './user_info.js';
import Job from './job.js';
import Language from './language.js';
import PostComment from './post_comment.js';
import Post from './post.js';
import Qna from './qna.js';
import QnaComment from './qna_comment.js';
import PostLike from './post_like.js';
import QnaLike from './qna_like.js';
import QnaCommentLike from './qna_comment_like.js';
import QnaTag from './qna_tag.js';
import QnaBookmark from './qna_bookmark.js';
import PostBookmark from './post_bookmark.js';
import Notification from './noti.js';
import PostTag from './post_tag.js';

const db = {};

db.sequelize = sequelize;
db.user = User;
db.user_info = UserInfo;
db.job = Job;
db.language = Language;
db.post = Post;
db.post_comment = PostComment;
db.post_like = PostLike;
db.post_bookmark = PostBookmark;
db.qna = Qna;
db.qna_comment = QnaComment;
db.qna_like = QnaLike;
db.qna_comment_like = QnaCommentLike;
db.qna_tag = QnaTag;
db.qna_bookmark = QnaBookmark;
db.notification = Notification;
db.post_tag = PostTag;

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
QnaTag.init(sequelize);
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
QnaTag.associate(db);
QnaBookmark.associate(db);
Notification.associate(db);
PostTag.associate(db);

export { db };
