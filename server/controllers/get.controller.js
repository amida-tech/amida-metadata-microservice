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
    }).catch(next);
}

function getNamespace(req, res, next) {
    const { uuid, namespace } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findOne({
            attributes: ['namespace', 'description'],
            where: { id: namespace },
            include: [{
                model: Domain,
                as: 'domains',
                attributes: ['domain', 'description'],
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
        Namespace.findOne({
            attributes: ['namespace', 'description'],
            where: { namespace },
            include: [{
                model: Domain,
                as: 'domains',
                required: false,
                attributes: ['domain', 'description'],

                include: [{
                    model: Attribute,
                    as: 'attributes',
                    required: false,
                    attributes: ['attribute', 'description'],

                    include: [{
                        model: Value,
                        as: 'values',
                        required: false,
                        attributes: ['type', 'value'],

                        where: {
                            [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                        },
                    }],
                }],
            }],
        })
      .then((data) => {
          if (data.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
            res.send(data);
          }
      });
    }
}

function getDomain(req, res, next) {
    const { uuid, namespace, domain } = req.params;

    if (!isNaN(namespace)) {
        Domain.findOne({
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
                    }],
                }],

        })
      .then((data) => {
          if (data.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(data);
          }
      })
      .catch(next);
    } else {
        Domain.findOne({

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
                    }],
                }],

        })
      .then((data) => {
          if (data.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(data);
          }
      });
    }
}

function getAttribute(req, res, next) {
    const { uuid, namespace, domain, attribute } = req.params;

    if (!isNaN(namespace)) {
        Attribute.findOne({
                    attributes: ['attribute', 'description'],
                    where: { id: attribute },
                    include: [{
                        model: Value,
                        as: 'values',
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ uuid }, { uuid: '00000000-0000-0000-0000-000000000000' }],
                        },
                    }],


        })
      .then((data) => {
          if (data.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(data);
          }
      })
      .catch(next);
    } else {
        Attribute.findOne({
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
                    }],
        })
      .then((data) => {
          if (data.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(data);
          }
      });
    }
}

export default { getUUID, getNamespace, getDomain, getAttribute };
