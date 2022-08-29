// 시퀄라이즈 생성하기위한 인덱스.js
export * from './sequelize.js';
import sequelize from './sequelize.js';

// 유저, 포스트, 댓글, 좋아요 임포트
import User from './user.js';
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

const db = {};

// 받아온 클래스들 사용
db.sequelize = sequelize;
db.user = User;
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

// init한 부분 설정
User.init(sequelize);
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

// 외래키 관계부분
User.associate(db);
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

export { db };