import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Preference = sequelize.define('preferences', {
    preferred_gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    min_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profile_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'profiles', // 'profiles' is the table name for Profile
            key: 'id',
        },
        allowNull: false,
    },
});

export default Preference;
