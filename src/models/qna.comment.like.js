import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaCommentLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'qnaCommentLike',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.qnaCommentLike.belongsTo(db.qnaComment, {
      foreignKey: 'qnaCommentId',
      targetKey: 'id',
    });
  }
}
