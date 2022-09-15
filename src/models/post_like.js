import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class PostLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: 'post_like',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.post_like.belongsTo(db.post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.post_like.belongsTo(db.user, {
      foreignKey: 'user_name',
      targetKey: 'user_name',
      onDelete: 'cascade',
    });
  }
}
