import httpStatus from 'http-status';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
const Value = db.Value;
// const Op = Sequelize.Op;

function setNamespace(req, res, next) {
    const { namespace, description, active } = req.body;
    if (namespace && description) {
        Namespace.findOne({ where: { namespace } })
        .then((data) => {
            if (data) {
                data.update(namespace, description, active)
                .then((dataUpdate) => {
                    res.send(dataUpdate);
                });
            } else {
                Namespace.create({ namespace, description, active })
                .then((dataCreate) => {
                    res.send(dataCreate);
                });
            }
        })
        .catch(next);
    } else if (!namespace) {
        const err = new APIError('namespace is a required POST variable!', 'ERROR', httpStatus.NOT_FOUND, true);
        next(err);
    } else if (!description) {
        const err = new APIError('description is a required POST variable!', 'ERROR', httpStatus.NOT_FOUND, true);
        next(err);
    }
}


function setDomain(req, res, next) {
    const { namespace, domain, description, active } = req.body;

    if (namespace && domain && description) {
        Namespace.findOne({
            where: { namespace },
        }).then((dataCreate) => {
          // dataCreate = JSON.parse(dataCreate);
            Domain.create({
                domain, description, NamespaceId: dataCreate.id,
                // domain: "hello", description: "test", active: 1, NamespaceId: 8,
            }).then((data) => {
                res.send(data);
            });

            // res.send({dataCreate.id});
        });
    } else {
        const err = new APIError('namespace, domain, and description are required POST variables!', 'ERROR', httpStatus.NOT_FOUND, true);
        next(err);
    }
}

function setAttribute(req, res, next) {
    const { domain, attribute, description, active } = req.body;

    if (attribute && domain && description) {
        Domain.findOne({
            where: { domain },
        }).then((dataCreate) => {
            Attribute.create({
                attribute, description, DomainId: dataCreate.id,
            }).then((data) => {
                res.send(data);
            });
        });
    } else {
        const err = new APIError('domain, attribute, and description are required POST variables!', 'ERROR', httpStatus.NOT_FOUND, true);
        next(err);
    }
}

function setValue(req, res, next) {
    const { attribute, value, active, type, uuid } = req.body;

    if (attribute && value && type && uuid) {
        Attribute.findOne({
            where: { attribute },
        }).then((dataCreate) => {
            Value.create({
                type, value, uuid, AttributeId: dataCreate.id,
            }).then((data) => {
                res.send(data);
            });
              // res.send(dataCreate);
        });
    } else {
        const err = new APIError('attribute, type, value, and uuid are required POST variables!', 'ERROR', httpStatus.NOT_FOUND, true);
        next(err);
    }
}


export default { setNamespace, setDomain, setAttribute, setValue };
