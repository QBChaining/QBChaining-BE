import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class QnAPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // title과 content init
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: false,
        underscored: false,
        modelName: "QnAPost",
        tableName: "QnApost",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.QnAPost.hasMany(db.QnAComment, {
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.QnAPost.belongsTo(db.User);
    db.QnAPost.hasMany(db.QnALike);
  }
}
