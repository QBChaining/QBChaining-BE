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
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qna_comment_like.belongsTo(db.qnaComment, {
      foreignKey: 'qnaCommentId',
      targetKey: 'id',
    });
  }
}
