import { Sequelize } from 'sequelize';
import configData from '../config/config.json' assert { type: "json" };

const sequelize = new Sequelize(
    configData.DB_NAME,
    configData.DB_USER,
    configData.DB_PASSWORD,
    {
        host: configData.DB_HOST,
        dialect: configData.DB_DIALECT,
    }
);

export default sequelize;