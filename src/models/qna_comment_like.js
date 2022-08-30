import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaCommentLike extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {
        user_name: {
          type: Sequelize.INTEGER,
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
  // belongsTo로 받아옴
  static associate(db) {
    db.qna_comment_like.belongsTo(db.qna_comment, {
      foreignKey: 'qna_comment_id',
      targetKey: 'id',
    });
  }
}
