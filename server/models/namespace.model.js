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

  //   Namespace.prototype.toJSON =  function () {
  //   var values = this.get();
  //   console.log('DOES THIS HAPPEN')
  //   return values;
  // }

    return Namespace;
};
