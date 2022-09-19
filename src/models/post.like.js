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
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.postLike.belongsTo(db.post, {
      foreignKey: 'postId',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.postLike.belongsTo(db.user, {
      foreignKey: 'userName',
      sourceKey: 'userName',
      onDelete: 'cascade',
    });
  }
}
