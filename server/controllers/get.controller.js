import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
const Value = db.Value;
const Op = Sequelize.Op;

function formatResult(result) {

}

function getUUID(req, res, next) {
    const { uuid } = req.params;

    Namespace.findAll({
        attributes: ['namespace', 'description'],
        include: {
            model: Domain,
            as: 'domains',
            attributes: ['domain', 'description'],
            required: false,
            include: {
                model: Attribute,
                as: 'attributes',
                attributes: ['attribute', 'description'],
                required: false,
                include: {
                    model: Value,
                    as: 'values',
                    attributes: ['type', 'value'],
                    required: false,
                    where: {
                        [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                    },
                    // order: [['id', 'ASC']],
                },
            },
        },
    })
    .then((data) => {
        if (data.length === 0) {
            const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
            next(err);
        } else {
            // const plainData = data.map((r) => r.get({ plain: true }));
            // Object.keys(plainData).forEach(function(key) {
            //   console.log("key: ", key, plainData[key]);
            //
            // });

            res.send({ namespaces: data });


        }
    })

    .catch(next);
}

function getNamespace(req, res, next) {
    const { uuid, namespace } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { id: namespace },
            include: [{
                model: Domain,
                as: 'domains',
                attributes: ['domain', 'description'],
                // order: [['id', 'ASC']],
                include: [{
                    model: Attribute,
                    as: 'attributes',
                    attributes: ['attribute', 'description'],
                    include: [{
                        model: Value,
                        as: 'values',
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                        },
                        // order: [['id', 'ASC']],
                    }],
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
            attributes: ['namespace', 'description'],
            where: { namespace },
            include: [{
                model: Domain,
                as: 'domains',
                // required: true,
                attributes: ['domain', 'description'],
                // order: [['id', 'ASC']],

                include: [{
                    model: Attribute,
                    as: 'attributes',
                    // required: true,
                    attributes: ['attribute', 'description'],
                    // order: [['id', 'ASC']],

                    include: [{
                        model: Value,
                        as: 'values',
                        // required: true,
                        attributes: ['type', 'value'],

                        where: {
                            [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                        },
                        // order: [['id', 'ASC']],
                    }],
                }],
            }],
            // order: [['domains', 'id', 'ASC']],
        })
      .then((data) => {
          if (data.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
            res.send({ namespaces: data });
          }
      });
    }
}

function getDomain(req, res, next) {
    const { uuid, namespace, domain } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { id: namespace },
            include: [{
                model: Domain,
                as: 'domains',
                attributes: ['domain', 'description'],
                where: { id: domain },
                include: [{
                    model: Attribute,
                    as: 'attributes',
                    attributes: ['attribute', 'description'],

                    include: [{
                        model: Value,
                        as: 'values',
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                        },
                        // order: [['id', 'ASC']],
                    }],
                }],
            }],

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
            attributes: ['namespace', 'description'],
            where: { namespace },

            include: [{
                model: Domain,
                as: 'domains',
                attributes: ['domain', 'description'],
                where: { domain },


                include: [{
                    model: Attribute,
                    as: 'attributes',
                    attributes: ['attribute', 'description'],

                    include: [{
                        model: Value,
                        as: 'values',
                        required: false,

                        attributes: ['type', 'value'],

                        where: {
                            [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                        },
                        // order: [['id', 'ASC']],
                    }],
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
      });
    }
}

function getAttribute(req, res, next) {
    const { uuid, namespace, domain, attribute } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { id: namespace },
            include: [{
                model: Domain,
                as: 'domains',
                attributes: ['domain', 'description'],
                where: { id: domain },
                include: [{
                    model: Attribute,
                    as: 'attributes',
                    attributes: ['attribute', 'description'],
                    where: { id: attribute },
                    include: [{
                        model: Value,
                        as: 'values',
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                        },
                        // order: [['id', 'ASC']],
                    }],
                }],
            }],

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
            attributes: ['namespace', 'description'],
            where: { namespace },

            include: [{
                model: Domain,
                as: 'domains',
                attributes: ['domain', 'description'],
                where: { domain },

                include: [{
                    model: Attribute,
                    as: 'attributes',
                    attributes: ['attribute', 'description'],
                    where: { attribute },

                    include: [{
                        model: Value,
                        as: 'values',
                        required: false,
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                        },
                        // order: [['id', 'ASC']],
                    }],
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
      });
    }
}

export default { getUUID, getNamespace, getDomain, getAttribute };
