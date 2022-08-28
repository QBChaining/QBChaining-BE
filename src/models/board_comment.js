import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class BoardComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // comment라는 이름으로 init
      // 문자열이며 100자 제한, allowNull은 false
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        choose: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: "board_comment",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // 외래키 설정 User의 id값 즉 외래키로 UserId 생성
  // 외래키 설정 Post의 id값 즉 외래키로 PostId 생성
  static associate(db) {
    db.board_comment.belongsTo(db.user);
    db.board_comment.belongsTo(db.board);
    db.board_comment.hasMany(db.board_comment_like);
  }
}
