import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class BoardCommentLike extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {
        like: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: "board_comment_like",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // belongsTo로 받아옴
  static associate(db) {
    db.board_comment_like.belongsTo(db.board_comment);
    db.board_comment_like.belongsTo(db.user);
  }
}
