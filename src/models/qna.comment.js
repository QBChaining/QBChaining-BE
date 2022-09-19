import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        is_choose: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        userName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        tableName: 'qnaComment',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qnaComment.belongsTo(db.qna, {
      foreignKey: 'qnaId',
      targetKey: 'id',
    });
    db.qnaComment.hasMany(db.qnaCommentLike);
    db.qnaComment.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
    });
  }
}
