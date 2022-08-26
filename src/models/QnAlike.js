import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class QnALike extends Sequelize.Model {
  static init(sequelize) {
    // like를 BOOLEAN 값으로 설정
    return super.init(
      {
        like: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        // 타임스탬프 = 크리에이티드 엣과 업데이티드엣 생성
        timestamps: false,
        // 파라노이드 = 삭제시 약한 삭제기능
        paranoid: false,
        // 카멜과 스트링 선택 여기서는 false로 설정하여서 createdAt으로(카멜) 생성
        underscored: false,
        // 모델명과 테이블명
        modelName: "QnALike",
        tableName: "QnAlike",
        // utf8 = 한글을 사용하기 위한 설정
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // belongsTo로 받아옴
  static associate(db) {
    db.User.belongsTo(db.QnAPost);
    db.QnAPost.belongsTo(db.User);
  }
}
