import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class PostLike extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: "post_like",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // belongsTo로 받아옴
  static associate(db) {
    db.post_like.belongsTo(db.post);
    db.post_like.belongsTo(db.user);
  }
}
