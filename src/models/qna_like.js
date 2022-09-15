import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: 'qna_like',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qna_like.belongsTo(db.qna, {
      foreignKey: 'qna_id',
      targetKey: 'id',
    });
    db.qna_like.belongsTo(db.user, {
      foreignKey: 'user_name',
      targetKey: 'user_name',
    });
  }
}
