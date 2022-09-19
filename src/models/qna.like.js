import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaLike extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'qnaLike',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qna_like.belongsTo(db.qna, {
      foreignKey: 'qnaId',
      targetKey: 'id',
    });
    db.qna_like.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
    });
  }
}
