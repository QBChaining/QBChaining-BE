import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class Job extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        job: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'job',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.job.belongsTo(db.user);
  }
}
