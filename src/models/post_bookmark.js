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
        underscored: true,
        tableName: 'post_bookmark',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.post_bookmark.belongsTo(db.post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.post_bookmark.belongsTo(db.user, {
      foreignKey: 'user_name',
      targetKey: 'user_name',
      onDelete: 'cascade',
    });
  }
}
