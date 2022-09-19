import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaBookmark extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'qnaBookmark',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qnaBookmark.belongsTo(db.qna, {
      foreignKey: 'qnaId',
      targetKey: 'id',
    });
    db.qnaBookmark.belongsTo(db.user, {
      sourceKey: 'userName',
      foreignKey: 'userName',
    });
  }
}
