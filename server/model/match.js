import pkg from 'sequelize';
const { DataTypes } = pkg;
import sequelize from '../db/sequelize.js';
import Profile from "./profile.js";

const Match = sequelize.define('matches', {
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'profiles', // Refers to the Profile model
            key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete if profile is deleted
    },
    match_profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'profiles', // Refers to the Profile model
            key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete if profile is deleted
    },
    match_timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

// One-to-many relationship (One profile can have many matches)
Match.belongsTo(Profile, { foreignKey: 'profile_id', as: 'profile' });
Match.belongsTo(Profile, { foreignKey: 'match_profile_id', as: 'matchedProfile' });

export default Match;
