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
        profileUrl: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        userName: {
          type: Sequelize.STRING(20),
          unique: true,
          allowNull: false,
        },
        rankPoint: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        profileImg: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        isNew: {
          type: Sequelize.STRING(10),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        tableName: 'user',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.user.hasOne(db.userInfo, { foreignKey: 'userId', sourceKey: 'id' });
    db.user.hasMany(db.language, { foreignKey: 'userId', sourceKey: 'id' });
    db.user.hasMany(db.qna, {
      sourceKey: 'userName',
      foreignKey: 'userName',
    });
    db.user.hasMany(db.qnaComment, {
      sourceKey: 'userName',
      foreignKey: 'userName',
    });
    db.user.hasMany(db.qnaLike, {
      sourceKey: 'userName',
      foreignKey: 'userName',
    });
    db.user.hasMany(db.qnaBookmark, {
      sourceKey: 'userName',
      foreignKey: 'userName',
    });
    db.user.hasMany(db.post, {
      sourceKey: 'userName',
      foreignKey: 'userName',
      onDelete: 'cascade',
    });
    db.user.hasMany(db.postLike, {
      foreignKey: 'userName',
      sourceKey: 'userName',
      onDelete: 'cascade',
    });
    db.user.hasMany(db.postComment, {
      foreignKey: 'userName',
      sourceKey: 'userName',
      onDelete: 'cascade',
    });
    db.user.hasMany(db.notification, {
      foreignKey: 'userName',
      sourceKey: 'userName',
    });
    db.user.hasMany(db.postCommentLike, {
      foreignKey: 'userName',
      sourceKey: 'userName',
      onDelete: 'cascade',
    });
  }
}
