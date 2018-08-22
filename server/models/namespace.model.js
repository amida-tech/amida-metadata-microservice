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
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        defaultScope: {
            where: {
                active: true,
            },
        },
    });

    return Namespace;
};
