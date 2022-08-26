// 시퀄라이즈 생성하기위한 인덱스.js
export * from "./sequelize.js";
import sequelize from "./sequelize.js";

// 유저, 포스트, 댓글, 좋아요 임포트
import User from "./user.js";
import Comment from "./comment.js";
import Post from "./post.js";
import QnAPost from "./QnApost.js";
import QnAComment from "./QnAcomment.js";
import Like from "./like.js";
import QnALike from "./QnAlike.js";
import QnACommentLike from "./QnAcommentlike.js";

const db = {};

// 받아온 클래스들 사용
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Like = Like;
db.QnAPost = QnAPost;
db.QnAComment = QnAComment;
db.QnALike = QnALike;
db.QnACommentLike = QnACommentLike;

// init한 부분 설정
User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Like.init(sequelize);
QnAPost.init(sequelize);
QnAComment.init(sequelize);
QnALike.init(sequelize);
QnACommentLike.init(sequelize);

// 외래키 관계부분
User.associate(db);
Post.associate(db);
Comment.associate(db);
Like.associate(db);
QnAPost.associate(db);
QnAComment.associate(db);
QnALike.associate(db);
QnACommentLike.associate(db);

// 다대다 테이블 해버릴거면 이게 맞을듯 이건 내일 뭐로할지 보고
// db.User.belongsToMany(db.Post, { through: "like" });
// db.Post.belongsToMany(db.User, { through: "like" });

// db.User.belongsToMany(db.Post, { through: "QnAlike" });
// db.Post.belongsToMany(db.User, { through: "QnAlike" });

export { db };
