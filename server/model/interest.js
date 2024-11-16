import pkg from 'sequelize';
const { DataTypes } = pkg;
import sequelize from '../db/sequelize.js';

const Interest = sequelize.define('interests', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

export default Interest;
