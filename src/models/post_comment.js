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
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'post_comment',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.post_comment.belongsTo(db.post, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
      foreignKey: 'post_id',
      targetKey: 'id',
    });
    db.post_comment.belongsTo(db.user, {
      foreignKey: 'user_name',
      targetKey: 'user_name',
    });
  }
}
