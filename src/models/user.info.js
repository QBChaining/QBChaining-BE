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
        job: {
          type: Sequelize.STRING(30),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        tableName: 'userInfo',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.userInfo.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });
  }
}
