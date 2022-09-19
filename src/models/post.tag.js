import Sequelize from 'sequelize';

export default class PostTag extends Sequelize.Model {
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
        underscored: false,
        tableName: 'postTag',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.postTag.belongsTo(db.post, {
      foreignKey: 'postId',
      targetKey: 'id',
    });
  }
}
