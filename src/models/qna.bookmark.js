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
        tableName: 'qna_bookmark',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qna_bookmark.belongsTo(db.qna, {
      foreignKey: 'qnaId',
      targetKey: 'id',
    });
    db.qna_bookmark.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
    });
  }
}
