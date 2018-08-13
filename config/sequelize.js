import Sequelize from 'sequelize';
import _ from 'lodash';
import config from './config';

let dbLogging;
if (config.env === 'test') {
    dbLogging = false;
} else {
    dbLogging = console.log;
}

const db = {};

// // connect to postgres db
const sequelize = new Sequelize(config.postgres.db,
  config.postgres.user,
  config.postgres.passwd,
    {
        dialect: 'postgres',
        port: config.postgres.port,
        host: config.postgres.host,
        logging: dbLogging,
    });

const Type = sequelize.import('../server/models/type.model');
const Attribute = sequelize.import('../server/models/attribute.model');
const Value = sequelize.import('../server/models/value.model');
//const User = sequelize.import('../server/models/user.model');

// Threads
Type.hasMany(Attribute);
Type.hasMany(Value);

Attribute.hasOne(Value)

//User.hasOne(Value, {as: 'UU'})

// Value.belongsTo(User);



// Messages
// Attribute.hasMany(Value);

// Users
// User.belongsToMany(Thread, {through: 'UserThread'});
// User.belongsToMany(Mess
// User.hasMany(UserThread);


db.Type = Type;
db.Attribute = Attribute;
db.Value = Value;
//db.User = User;


// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize,
    Sequelize,
}, db);
