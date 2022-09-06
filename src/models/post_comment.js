import Sequelize from 'sequelize';

import { sequelize } from './sequelize.js';

export default class PostComment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // comment라는 이름으로 init
      // 문자열이며 100자 제한, allowNull은 false
      {
        comment: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        user_name: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        tableName: 'post_comment',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  // 외래키 설정 User의 id값 즉 외래키로 UserId 생성
  // 외래키 설정 Post의 id값 즉 외래키로 PostId 생성
  static associate(db) {
    db.post_comment.belongsTo(db.post, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
      foreignKey: 'post_id',
      targetKey: 'id',
    });
  }
}
