import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class QnaLike extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
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
  // belongsTo로 받아옴
  static associate(db) {
    db.qna_like.belongsTo(db.qna, {
      foreignKey: 'qna_id',
      targetKey: 'id',
    });
    db.qna_like.belongsTo(db.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  }
}
