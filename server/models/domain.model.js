
module.exports = (sequelize, DataTypes) => {
    const Domain = sequelize.define('Domain', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Domain;
};
