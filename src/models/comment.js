import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      // comment라는 이름으로 init
      // 문자열이며 100자 제한, allowNull은 false
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        // 타임스탬프 = 크리에이티드 엣과 업데이티드엣 생성
        timestamps: true,
        // 파라노이드 = 삭제시 약한 삭제기능
        paranoid: false,
        // 카멜과 스트링 선택 여기서는 false로 설정하여서 createdAt으로(카멜) 생성
        underscored: false,
        // 모델명과 테이블명
        modelName: "Comment",
        tableName: "comment",
        // utf8 = 한글을 사용하기 위한 설정
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  // 외래키 설정 User의 id값 즉 외래키로 UserId 생성
  // 외래키 설정 Post의 id값 즉 외래키로 PostId 생성
  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
}
