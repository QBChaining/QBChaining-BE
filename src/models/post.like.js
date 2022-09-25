import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class PostLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'postLike',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.postLike.belongsTo(db.post, {
      foreignKey: 'postId',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.postLike.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
  }
}
