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
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        language: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        is_resolve: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: false,
        underscored: true,
        tableName: 'qna',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.qna.hasMany(db.qna_comment);
    db.qna.belongsTo(db.user, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    db.qna.hasMany(db.qna_like);
    db.qna.hasMany(db.qna_bookmark);
    db.qna.hasMany(db.qna_tag);
  }
}
