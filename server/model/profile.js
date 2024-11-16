import pkg from 'sequelize';
const { DataTypes } = pkg;
import sequelize from '../db/sequelize.js';
import User from './user.js'; // Import the User model to establish the relationship

// Define the Profile model
const Profile = sequelize.define('profiles', {
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User, // Reference the User model
            key: 'id', // Key in the User model that this foreign key refers to
        },
        onDelete: 'CASCADE', // Automatically delete profile if user is deleted
        onUpdate: 'CASCADE', // Update foreign key if user id is updated
    },
});

// Establish the one-to-one relationship
User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId' });

export default Profile;
