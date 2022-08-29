import { Sequelize } from 'sequelize';

import config from '../config/config.js';

// 환경설정(개발자환경에서 쓰던것을 그대로 사용할 예정)
const env = 'development';
// db와 name, password config.js의 것 설정
const { database, username, password } = config[env];
const sequelize = new Sequelize(database, username, password, config[env]);

export { sequelize };
export default sequelize;
