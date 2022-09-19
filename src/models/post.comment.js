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
        underscored: false,
        tableName: 'postComment',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.postComment.belongsTo(db.post, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
      foreignKey: 'postId',
      targetKey: 'id',
    });
    db.postComment.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
    });
  }
}
