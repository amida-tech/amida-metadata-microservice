
module.exports = (sequelize, DataTypes) => {
    const Attribute = sequelize.define('Attribute', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        attribute: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UUID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        }
    });

    return Attribute;
};
