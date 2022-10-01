import Sequelize from 'sequelize';

export default class Qna extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(16000),
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
        likes: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
        indexes: [
          // 인덱스 설정
          {
            name: 'content',
            // 인덱스 이름은 따로 지정해주지 않아, 인덱스명은 [table]_[fields]
            type: 'FULLTEXT', // 풀텍스트 인덱스 설정
            fields: ['content'],
          },
        ],
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
