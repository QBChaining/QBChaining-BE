import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class PostBookmark extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'postBookmark',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.postBookmark.belongsTo(db.post, {
      foreignKey: 'postId',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.postBookmark.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
      onDelete: 'cascade',
    });
  }
}
