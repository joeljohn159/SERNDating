import pkg from 'sequelize';
const { DataTypes } = pkg;
import sequelize from '../db/sequelize.js';
import Profile from './profile.js';
import Interest from './interest.js';

// Define the Profile_Interest model
const ProfileInterest = sequelize.define('profile_interests', {
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Profile,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    interest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Interest,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
});

// Establish many-to-many relationships
Profile.belongsToMany(Interest, { through: ProfileInterest, foreignKey: 'profile_id' });
Interest.belongsToMany(Profile, { through: ProfileInterest, foreignKey: 'interest_id' });

export default ProfileInterest;
