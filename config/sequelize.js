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
const Value = sequelize.import('../server/models/value.model');


Namespace.hasMany(Domain, { as: 'domains' });
// Namespace.hasMany(Attribute);
// Namespace.hasMany(Value);
// Value.belongsTo(Namespace, { through: 'value_id', foreignKey: 'NamespaceId' });

Domain.hasMany(Attribute, { as: 'attributes' });
// Domain.hasMany(Value);
// Value.belongsTo(Domain, { through: 'value_id', foreignKey: 'DomainId' });


Attribute.hasMany(Value, { as: 'values' });
// Value.belongsTo(Attribute, { through: 'value_id', foreignKey: 'AttributeId' });


sequelize.sync();

db.Namespace = Namespace;
db.Domain = Domain;
db.Attribute = Attribute;
db.Value = Value;
// db.User = User;


// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize,
    Sequelize,
}, db);
