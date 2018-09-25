module.exports = (sequelize, DataTypes) => {
    const Value = sequelize.define('Value', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
    }, {
        defaultScope: {
            where: {
                active: true,
            },
        }
    });

  //   Value.prototype.toJSON =  function () {
  //   var values = this.get({ plain: true });
  //
  //   return values;
  // }

    return Value;
};
