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
        underscored: false,
        tableName: 'language',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }
  static associate(db) {
    db.language.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });
  }
}
