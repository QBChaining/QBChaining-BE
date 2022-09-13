import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        profile_url: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        user_name: {
          type: Sequelize.STRING(20),
          unique: true,
          allowNull: false,
        },
        rank_point: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        profile_img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        is_new: {
          type: Sequelize.STRING(10),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'user',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  //외래키로 넘겨주기 때문에 hasMany설정
  static associate(db) {
    db.user.hasOne(db.user_info, { foreignKey: 'user', sourceKey: 'id' });
    db.user.hasMany(db.post);
    db.user.hasMany(db.qna, { sourceKey: 'id' });
    db.user.hasMany(db.post_like);
    db.user.hasMany(db.qna_like);
    db.user.hasMany(db.qna_bookmark);
    db.user.hasMany(db.post_comment);
    db.user.hasMany(db.qna_comment);
  }
}
