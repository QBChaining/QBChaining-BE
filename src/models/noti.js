import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class Notification extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {
        data: {
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
  // belongsTo로 받아옴
  static associate(db) {
    db.notification.belongsTo(db.post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.notification.belongsTo(db.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  }
}
