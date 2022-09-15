import Sequelize from 'sequelize';

export default class QnaTag extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        tag: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: 'qna_tag',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.qna_tag.belongsTo(db.qna, {
      foreignKey: 'qna_id',
      targetKey: 'id',
    });
  }
}
