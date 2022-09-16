import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(10000),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'post',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.post.hasMany(db.post_comment, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.post.belongsTo(db.user, {
      foreignKey: 'user_name',
      targetKey: 'user_name',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.post.hasMany(db.post_like);
    db.post.hasMany(db.post_bookmark);
    db.post.hasMany(db.post_tag);
    db.post.hasMany(db.notification);
  }
}
