import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
const Op = Sequelize.Op;


function getUUID(req, res, next) {

    const { UUID } = req.params;

    Namespace.findAll({
      attributes: ['id','namespace', 'description'],
      include: [{
        model: Domain, attributes: ['id','domain', 'description'],
        include: [{
            model: Attribute,
            attributes: ['id','attribute'],
            where: {
              UUID
            },
            required: false
          }]
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

    if(!isNaN(namespace)) {
      Namespace.findAll({
        attributes: ['id','namespace', 'description'],
        where: { id: namespace },
        include: [{
          model: Domain,
          attributes: ['id','domain', 'description'],
          order: [['id','ASC']],
          include: [{
              model: Attribute,
              attributes: ['id','attribute'],
              where: {
                UUID
              },
              required: false
            }]
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
        attributes: ['id','namespace', 'description'],
        where: { namespace },
        include: [{
          model: Domain,
          attributes: ['id','domain', 'description'],
          order: [['id','ASC']],
          include: [{
              model: Attribute,
              attributes: ['id','attribute'],
              where: {
                UUID
              },
              order: [['id','ASC']],

              required: false
            }]
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
    }
}

function getDomain(req, res, next) {

    const { UUID, namespace, domain } = req.params;

    if(!isNaN(namespace)) {
      Namespace.findAll({
        attributes: ['id','namespace', 'description'],
        where: { id: namespace },
        include: [{
          model: Domain, attributes: ['id','domain', 'description'],
          where: { id: domain },
          include: [{
              model: Attribute,
              attributes: ['id','attribute'],
              where: {
                UUID
              },
              required: false
            }]
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
        attributes: ['id','namespace', 'description'],
        where: { namespace },
        include: [{
          model: Domain,
          attributes: ['id','domain', 'description'],
          where: { domain },
          include: [{
              model: Attribute,
              attributes: ['id','attribute'],
              where: {
                UUID
              },
              required: false
            }]
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
    }
}

export default { getUUID, getNamespace, getDomain };
