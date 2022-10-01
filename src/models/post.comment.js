import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class PostComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        likes: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        tableName: 'postComment',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.postComment.belongsTo(db.post, {
      foreignKey: 'postId',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.postComment.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
    db.postComment.hasMany(db.postCommentLike, {
      foreignKey: 'postCommentId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  }
}
