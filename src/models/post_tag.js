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
        underscored: true,
        tableName: 'post_tag',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.post_tag.belongsTo(db.post, {
      foreignKey: 'post_id',
      targetKey: 'id',
    });
  }
}
