import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class BoardLike extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: "board_like",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // belongsTo로 받아옴
  static associate(db) {
    db.board_like.belongsTo(db.board);
    db.board_like.belongsTo(db.user);
  }
}
