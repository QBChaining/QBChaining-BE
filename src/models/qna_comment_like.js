import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaCommentLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: 'qna_comment_like',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qna_comment_like.belongsTo(db.qna_comment, {
      foreignKey: 'qna_comment_id',
      targetKey: 'id',
    });
  }
}
