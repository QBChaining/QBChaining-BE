import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class Language extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        language: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'language',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  //외래키로 넘겨주기 때문에 hasMany설정
  static associate(db) {
    db.language.belongsTo(db.user_info);
  }
}
