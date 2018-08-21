import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
const Value = db.Value;
const Op = Sequelize.Op;


function getUUID(req, res, next) {
    const { UUID } = req.params;

    Namespace.findAll({
        attributes: ['namespace', 'description'],
        include: [{
            model: Domain,
            attributes: ['domain', 'description'],

            include: [{
                model: Attribute,
                attributes: ['attribute', 'description'],

                include: [{
                    model: Value,
                    attributes: ['type', 'value'],
                    where: {
                        [Op.or]: [{ UUID }, { UUID: '00000000-0000-0000-0000-000000000000' }],
                    },
                    order: [['id', 'ASC']],
                }],
            }],
        }],
    })
    .then((messages) => {
        if (messages.length === 0) {
            const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
            next(err);
        } else {
            res.send(messages);
        }
    })
    .catch(next);
}

function getNamespace(req, res, next) {
    const { UUID, namespace } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { id: namespace },
            include: [{
                model: Domain,
                attributes: ['domain', 'description'],
                order: [['id', 'ASC']],
                include: [{
                    model: Attribute,
                    attributes: ['attribute', 'description'],
                    include: [{
                        model: Value,
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ UUID }, { UUID: '00000000-0000-0000-0000-000000000000' }],
                        },
                        order: [['id', 'ASC']],
                    }],
                }],
            }],
            order: [[Domain, 'id', 'ASC']],
        })
      .then((messages) => {
          if (messages.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(messages);
          }
      })
      .catch(next);
    } else {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { namespace },
            include: [{
                model: Domain,
                // required: true,
                attributes: ['domain', 'description'],
                order: [['id', 'ASC']],

                include: [{
                    model: Attribute,
                    // required: true,
                    attributes: ['attribute', 'description'],
                    order: [['id', 'ASC']],

                    include: [{
                        model: Value,
                        // required: true,
                        attributes: ['type', 'value'],

                        where: {
                            [Op.or]: [{ UUID }, { UUID: '00000000-0000-0000-0000-000000000000' }],
                        },
                        order: [['id', 'ASC']],
                    }],
                }],
            }],
            order: [[Domain, 'id', 'ASC']],
        })
      .then((messages) => {
          if (messages.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(messages);
          }
      });
    }
}

function getDomain(req, res, next) {
    const { UUID, namespace, domain } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { id: namespace },
            include: [{
                model: Domain,
                attributes: ['domain', 'description'],
                where: { id: domain },
                include: [{
                    model: Attribute,
                    attributes: ['attribute', 'description'],

                    include: [{
                        model: Value,
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ UUID }, { UUID: '00000000-0000-0000-0000-000000000000' }],
                        },
                        order: [['id', 'ASC']],
                    }],
                }],
            }],

        })
      .then((messages) => {
          if (messages.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(messages);
          }
      })
      .catch(next);
    } else {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { namespace },

            include: [{
                model: Domain,
                attributes: ['domain', 'description'],
                where: { domain },


                include: [{
                    model: Attribute,
                    attributes: ['attribute', 'description'],

                    include: [{
                        model: Value,
                        required: false,

                        attributes: ['type', 'value'],

                        where: {
                            [Op.or]: [{ UUID }, { UUID: '00000000-0000-0000-0000-000000000000' }],
                        },
                        order: [['id', 'ASC']],
                    }],
                }],

            }],
            order: [[Domain, 'id', 'ASC']],
        })
      .then((messages) => {
          if (messages.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(messages);
          }
      });
    }
}

function getAttribute(req, res, next) {
    const { UUID, namespace, domain, attribute } = req.params;

    if (!isNaN(namespace)) {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { id: namespace },
            include: [{
                model: Domain,
                attributes: ['domain', 'description'],
                where: { id: domain },
                include: [{
                    model: Attribute,
                    attributes: ['attribute', 'description'],
                    where: { id: attribute },
                    include: [{
                        model: Value,
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ UUID }, { UUID: '00000000-0000-0000-0000-000000000000' }],
                        },
                        order: [['id', 'ASC']],
                    }],
                }],
            }],

        })
      .then((messages) => {
          if (messages.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(messages);
          }
      })
      .catch(next);
    } else {
        Namespace.findAll({
            attributes: ['namespace', 'description'],
            where: { namespace },

            include: [{
                model: Domain,
                attributes: ['domain', 'description'],
                where: { domain },

                include: [{
                    model: Attribute,
                    attributes: ['attribute', 'description'],
                    where: { attribute },

                    include: [{
                        model: Value,
                        required: false,
                        attributes: ['type', 'value'],
                        where: {
                            [Op.or]: [{ UUID }, { UUID: '00000000-0000-0000-0000-000000000000' }],
                        },
                        order: [['id', 'ASC']],
                    }],
                }],

            }],
            order: [[Domain, 'id', 'ASC']],
        })
      .then((messages) => {
          if (messages.length === 0) {
              const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
              next(err);
          } else {
              res.send(messages);
          }
      });
    }
}

export default { getUUID, getNamespace, getDomain, getAttribute };
