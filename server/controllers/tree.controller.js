import httpStatus from 'http-status';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
// const Value = db.Value;
// const Op = Sequelize.Op;

function getNamespace(req, res, next) {
    Namespace.findAll({
        attributes: ['id', 'namespace', 'description'],
        required: false,

        include: [{
            model: Domain,
            as: 'domains',
            required: false,
            attributes: ['id', 'domain', 'description'],
            order: [['id', 'ASC']],

            include: [{
                model: Attribute,
                as: 'attributes',
                required: false,
                attributes: ['id', 'attribute', 'description'],
                order: [['id', 'ASC']],
            }],
        }],
        // order: [[Domain, 'id', 'ASC']],
    })
    .then((data) => {
        if (data.length === 0) {
            const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
            next(err);
        } else {
            res.send({ namespaces: data });
        }
    })
    .catch(next);
}

function getDomain(req, res, next) {
    const { namespace } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findAll({
            attributes: ['id', 'namespace', 'description'],
            required: false,
            where: { id: namespace },

            include: [{
                model: Domain,
                as: 'domains',
                required: false,
                attributes: ['id', 'domain', 'description'],
                order: [['id', 'ASC']],

                include: [{
                    model: Attribute,
                    as: 'attributes',
                    required: false,
                    attributes: ['id', 'attribute', 'description'],
                    order: [['id', 'ASC']],
                }],
            }],
            // order: [[Domain, 'id', 'ASC']],
        })
        .then((data) => {
            if (data.length === 0) {
                const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
                next(err);
            } else {
                res.send({ namespaces: data });
            }
        })
        .catch(next);
    } else {
        Namespace.findAll({
            attributes: ['id', 'namespace', 'description'],
            required: false,
            where: { namespace },

            include: [{
                model: Domain,
                as: 'domains',
                required: false,
                attributes: ['id', 'domain', 'description'],
                order: [['id', 'ASC']],

                include: [{
                    model: Attribute,
                    as: 'attributes',
                    required: false,
                    attributes: ['id', 'attribute', 'description'],
                    order: [['id', 'ASC']],
                }],
            }],
            // order: [[Domain, 'id', 'ASC']],
        }).then((data) => {
            if (data.length === 0) {
                const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
                next(err);
            } else {
                res.send({ namespaces: data });
            }
        })
      .catch(next);
    }
}

function getAttribute(req, res, next) {
    const { namespace, domain } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findAll({
            attributes: ['id', 'namespace', 'description'],
            required: false,
            where: { id: namespace },

            include: [{
                model: Domain,
                as: 'domains',
                required: false,
                attributes: ['id', 'domain', 'description'],
                where: { id: domain },
                order: [['id', 'ASC']],

                include: [{
                    model: Attribute,
                    as: 'attributes',
                    required: false,
                    attributes: ['id', 'attribute', 'description'],
                    order: [['id', 'ASC']],
                }],
            }],
        // order: [[Attribute,Domain,'id','ASC']],
        })
      .then((data) => {
          if (data.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send({ namespaces: data });
          }
      })
      .catch(next);
    } else {
        Namespace.findAll({
            attributes: ['id', 'namespace', 'description'],
            required: false,
            where: { namespace },

            include: [{
                model: Domain,
                as: 'domains',
                required: false,
                attributes: ['id', 'domain', 'description'],
                where: { domain },
                order: [['id', 'ASC']],

                include: [{
                    model: Attribute,
                    as: 'attributes',
                    required: false,
                    attributes: ['id', 'attribute', 'description'],
                    order: [['id', 'ASC']],
                }],
            }],
       // order: [[Attribute,Domain,'id','ASC']],
        }).then((data) => {
            if (data.length === 0) {
                const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
                next(err);
            } else {
                  res.send({ namespaces: data });
            }
        })
        .catch(next);
    }
}

export default { getNamespace, getDomain, getAttribute };
