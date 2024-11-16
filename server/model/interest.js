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

Interest.associate = (models) => {
    Interest.belongsToMany(models.Profile, {
        through: 'profileinterests', // Join table name
        as: 'profiles',             // Alias for the association
        foreignKey: 'interest_id',
    });
};
export default Interest;
