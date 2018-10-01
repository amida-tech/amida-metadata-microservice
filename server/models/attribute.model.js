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

    // Attribute.prototype.toJSON =  function () {
    //   this.map(function(data) {
    //     return data.toJSON();
    //   });
    // var values = Object.assign({}, this.get({ plain: true }));

    // return values;


    return Attribute;
};
