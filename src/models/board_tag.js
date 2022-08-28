import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class BoardTag extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {
        tag: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: "board_tag",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // belongsTo로 받아옴
  static associate(db) {
    db.board_tag.belongsTo(db.board);
  }
}
