import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(10000),
          allowNull: false,
        },
        tags: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        like: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        tableName: 'post',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.post.hasMany(db.postComment, {
      foreignKey: 'postId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.post.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
    db.post.hasMany(db.postLike, {
      foreignKey: 'postId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.post.hasMany(db.postBookmark, {
      foreignKey: 'postId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.post.hasMany(db.notification, {
      foreignKey: 'postId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  }
}
