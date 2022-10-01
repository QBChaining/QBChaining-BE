import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class PostCommentLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'postCommentLike',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.postCommentLike.belongsTo(db.postComment, {
      foreignKey: 'postCommentId',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.postCommentLike.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
  }
}
