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
        tags: {
          type: Sequelize.STRING(115),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: false,
        underscored: false,
        tableName: 'qna',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    );
  }

  static associate(db) {
    db.qna.belongsTo(db.user, {
      targetKey: 'userName',
      foreignKey: 'userName',
    });
    db.qna.hasMany(db.qnaComment, {
      foreignKey: 'qnaId',
      sourceKey: 'id',
    });
    db.qna.hasMany(db.qnaLike, {
      foreignKey: 'qnaId',
      sourceKey: 'id',
    });
    db.qna.hasMany(db.qnaBookmark, {
      foreignKey: 'qnaId',
      sourceKey: 'id',
    });

    db.qna.hasMany(db.notification, {
      foreignKey: 'qnaId',
      sourceKey: 'id',
    });
  }
}
