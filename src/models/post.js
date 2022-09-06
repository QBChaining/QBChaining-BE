
import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";


export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // title과 content init
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(10000),
          allowNull: false,
        },
        tag: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: "post",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // 관계설정, Comment와 Like에게 외래키를 넘겨주기 때문에 hasMany설정
  // User의 id값을 외래키로 사용하기때문에 belongsTo 사용
  static associate(db) {
    db.post.hasMany(db.post_comment, {
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.post.belongsTo(db.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.post.hasMany(db.post_like);
    db.post.hasMany(db.post_bookmark);
  }
}
