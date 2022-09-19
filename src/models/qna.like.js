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
    db.qnaLike.belongsTo(db.qna, {
      foreignKey: 'qnaId',
      targetKey: 'id',
    });
    db.qnaLike.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
    });
  }
}
