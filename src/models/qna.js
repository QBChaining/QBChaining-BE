import Sequelize from 'sequelize';

export default class Qna extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        isResolve: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: false,
        underscored: false,
        tableName: 'qna',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.qna.hasMany(db.qnaComment);
    db.qna.belongsTo(db.user, {
      foreignKey: 'userName',
      targetKey: 'userName',
    });
    db.qna.hasMany(db.qnaLike);
    db.qna.hasMany(db.qnaBookmark);
    db.qna.hasMany(db.qnaTag);
    db.qna.hasMany(db.notification);
  }
}
