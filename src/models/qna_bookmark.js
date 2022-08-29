import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaBookmark extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {},
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: 'qna_bookmark',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  // belongsTo로 받아옴
  static associate(db) {
    db.qna_bookmark.belongsTo(db.qna);
    db.qna_bookmark.belongsTo(db.user);
  }
}
