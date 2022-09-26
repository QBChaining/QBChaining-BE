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
        isChoose: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        userName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        like: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        tableName: 'qnaComment',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.qnaComment.belongsTo(db.user, {
      targetKey: 'userName',
      foreignKey: 'userName',
    });
    db.qnaComment.belongsTo(db.qna, {
      foreignKey: 'qnaId',
      targetKey: 'id',
    });
    db.qnaComment.hasMany(db.qnaCommentLike, {
      foreignKey: 'qnaCommentId',
      sourceKey: 'id',
    });
  }
}
