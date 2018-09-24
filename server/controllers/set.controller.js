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
            Domain.create({
                namespace, description, active, NamespaceId: dataCreate.id,
            }).then((data) => {
                res.send(data);
            });
        });
    } else {
        const err = new APIError('namespace, domain, and description are required POST variables!', 'ERROR', httpStatus.NOT_FOUND, true);
        next(err);
    }
}

function setAttribute(req, res, next) {
    const { domain, attribute, description, active } = req.params;

    if (namespace && domain && description) {
        Namespace.findOne({
            where: { namespace },
        }).then((dataCreate) => {
            Domain.create({
                namespace, description, active, NamespaceId: dataCreate.id,
            }).then((data) => {
                res.send(data);
            });
        });
    } else {
        const err = new APIError('namespace, domain, and description are required POST variables!', 'ERROR', httpStatus.NOT_FOUND, true);
        next(err);
    }
}

function setValue(req, res, next) {
    const { attribute, value, description, active, type } = req.params;

    if (namespace && domain && description) {
        Namespace.findOne({
            where: { namespace },
        }).then((dataCreate) => {
            Domain.create({
                namespace, description, active, NamespaceId: dataCreate.id,
            }).then((data) => {
                res.send(data);
            });
        });
    } else {
        const err = new APIError('namespace, domain, and description are required POST variables!', 'ERROR', httpStatus.NOT_FOUND, true);
        next(err);
    }

}


export default { setNamespace, setDomain, setAttribute, setValue };
