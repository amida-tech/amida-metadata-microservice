/**
 * User Schema
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {

        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return User;
};
