import { Sequelize } from 'sequelize';

import config from '../config/config.js';

const env = 'production';
const { database, username, password } = config[env];
const sequelize = new Sequelize(database, username, password, config[env]);

export { sequelize };
export default sequelize;
