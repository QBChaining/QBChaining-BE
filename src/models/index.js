// 시퀄라이즈 생성하기위한 인덱스.js
export * from "./sequelize.js";
import sequelize from "./sequelize.js";

// 유저, 포스트, 댓글, 좋아요 임포트
import User from "./user.js";
import PostComment from "./post_comment.js";
import Post from "./post.js";
import Board from "./board.js";
import BoardComment from "./board_comment.js";
import PostLike from "./post_like.js";
import BoardLike from "./board_like.js";
import BoardCommentLike from "./board_comment_like.js";

const db = {};

// 받아온 클래스들 사용
db.sequelize = sequelize;
db.user = User;
db.post = Post;
db.post_comment = PostComment;
db.post_like = PostLike;
db.board = Board;
db.board_comment = BoardComment;
db.board_like = BoardLike;
db.board_comment_like = BoardCommentLike;

// init한 부분 설정
User.init(sequelize);
Post.init(sequelize);
PostComment.init(sequelize);
PostLike.init(sequelize);
Board.init(sequelize);
BoardComment.init(sequelize);
BoardLike.init(sequelize);
BoardCommentLike.init(sequelize);

// 외래키 관계부분
User.associate(db);
Post.associate(db);
PostComment.associate(db);
PostLike.associate(db);
Board.associate(db);
BoardComment.associate(db);
BoardLike.associate(db);
BoardCommentLike.associate(db);

// 다대다 테이블 해버릴거면 이게 맞을듯 이건 내일 뭐로할지 보고
// db.User.belongsToMany(db.Post, { through: "like" });
// db.Post.belongsToMany(db.User, { through: "like" });

// db.User.belongsToMany(db.Post, { through: "QnAlike" });
// db.Post.belongsToMany(db.User, { through: "QnAlike" });

export { db };
