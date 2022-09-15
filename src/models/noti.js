import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class Notification extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
        check: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: 'notification',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.notification.belongsTo(db.post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.notification.belongsTo(db.qna, {
      foreignKey: 'qna_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.notification.belongsTo(db.user, {
      foreignKey: 'user_name',
      targetKey: 'user_name',
      onDelete: 'cascade',
    });
  }
}
