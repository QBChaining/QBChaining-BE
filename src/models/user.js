import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        user_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        rank_point: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: "user",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  //외래키로 넘겨주기 때문에 hasMany설정
  static associate(db) {
    db.user.hasMany(db.post);
    db.user.hasMany(db.board);
    db.user.hasMany(db.post_like);
    db.user.hasMany(db.board_like);
    db.user.hasMany(db.board_bookmark);
  }
}
