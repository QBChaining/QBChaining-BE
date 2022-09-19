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
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.user.hasOne(db.userInfo, { foreignKey: 'user', sourceKey: 'id' });
    db.user.hasMany(db.post, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
    db.user.hasMany(db.language);
    db.user.hasMany(db.job);
    db.user.hasMany(db.qna);
    db.user.hasMany(db.postLike, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
    db.user.hasMany(db.qnaLike);
    db.user.hasMany(db.qnaBookmark);
    db.user.hasMany(db.postComment, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
    db.user.hasMany(db.qnaComment);
    db.user.hasMany(db.postBookmark, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
    db.user.hasMany(db.notification, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
  }
}
