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
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.qnaBookmark.belongsTo(db.qna, {
      foreignKey: 'qnaId',
      targetKey: 'id',
    });
    db.qnaBookmark.belongsTo(db.user, {
      targetKey: 'userName',
      foreignKey: 'userName',
    });
  }
}
