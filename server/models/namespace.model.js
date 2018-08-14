
module.exports = (sequelize, DataTypes) => {
    const Namespace = sequelize.define('Namespace', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        namespace: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Namespace;
};
