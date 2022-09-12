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
        user_name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'qna_comment',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qna_comment.belongsTo(db.qna, {
      foreignKey: 'qna_id',
      targetKey: 'id',
    });
    db.qna_comment.hasMany(db.qna_comment_like);
    db.qna_comment.belongsTo(db.user, {
      foreignKey: 'user_name',
      targetKey: 'user_name',
    });
  }
}
