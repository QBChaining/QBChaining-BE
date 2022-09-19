import Sequelize from 'sequelize';
import Post from './post.js';
import User from './user.js';

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
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.postBookmark.belongsTo(db.post, {
      foreignKey: 'postId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.postBookmark.belongsTo(db.user, {
      foreignKey: 'userName',
      sourceKey: 'userName',
      onDelete: 'cascade',
    });
  }
}
