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

const Namespace = sequelize.import('../server/models/namespace.model');
const Domain = sequelize.import('../server/models/domain.model');
const Attribute = sequelize.import('../server/models/attribute.model');
//const User = sequelize.import('../server/models/user.model');




//User.hasOne(Value, {as: 'UU'})
Attribute.belongsTo(Namespace);
Attribute.belongsTo(Domain);

Namespace.hasMany(Domain);
Domain.hasMany(Attribute)


db.Namespace = Namespace;
db.Domain = Domain;
db.Attribute = Attribute;
//db.User = User;


// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize,
    Sequelize,
}, db);
