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
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        username: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        point: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: false,
        underscored: false,
        modelName: "User",
        tableName: "user",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  //외래키로 넘겨주기 때문에 hasMany설정
  static associate(db) {
    db.User.hasMany(db.Post, { onDelete: "cascade", onUpdate: "cascade" });
    db.User.hasMany(db.Comment, {
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.User.hasMany(db.QnAPost);
    db.User.hasMany(db.QnAComment);
    db.User.hasMany(db.Like);
    db.User.hasMany(db.QnALike);
    db.User.hasMany(db.QnACommentLike);
  }
}
