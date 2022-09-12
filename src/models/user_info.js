import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class UserInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        age: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        gender: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        career: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'user_info',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  //외래키로 넘겨주기 때문에 hasMany설정
  static associate(db) {
    db.user_info.belongsTo(db.user, { foreignKey: 'user', targetKey: 'id' });
    db.user_info.hasMany(db.language);
    // db.user_info.hasMany(db.job);
  }
}