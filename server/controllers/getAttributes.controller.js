import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
const Op = Sequelize.Op;


function getNamespace(req, res, next) {
    Namespace.findAll({
         order: [['id','ASC']]
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

function getDomain(req, res, next) {

    const { namespace } = req.params;

    // if(!isNaN(namespace)) {
    //     Domain.findAll({
    //         where: { NamespaceId: namespace },
    //         order: [['id', 'ASC']]
    //     })
    //     .then((messages) => {
    //         if (messages.length === 0) {
    //             const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
    //             next(err);
    //         } else {
    //             res.send(messages);
    //         }
    //     })
    //     .catch(next);
    // } else {
    //     Namespace.findAll({
    //       where: { uri: namespace },
    //     }).then((namespace) => {
    //       if (namespace.length === 0) {
    //           const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
    //           next(err);
    //       } else {
    //         Domain.findAll({
    //             where: { NamespaceId: namespace[0].dataValues.id },
    //             order: [['id','ASC']]
    //         })
    //         .then((messages) => {
    //             if (messages.length === 0) {
    //                 const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
    //                 next(err);
    //             } else {
    //                 res.send(messages);
    //             }
    //         })
    //         .catch(next);
    //       }
    //     })
    // }
    if(!isNaN(namespace)) {
      Namespace.findAll({
        attributes: ['id','namespace','uri'],
        where: { id: namespace },
          include: [{
            model: Domain,
            attributes: ['id','domain','uri'],
            order: [['id','ASC']],
          }],
          order: [[Domain,'id','ASC']],
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
        attributes: ['id','namespace','uri'],
        where: { uri: namespace },

          include: [{
            model: Domain,
            attributes: ['id','domain','uri'],
            order: [['id','ASC']],
          }],
          order: [[Domain,'id','ASC']],
        }).then((messages) => {
            if (messages.length === 0) {
                const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
                next(err);
            } else {
                res.send(messages);
            }
        })
        .catch(next);
    }
}


function getAttribute(req, res, next) {

    const { namespace, domain } = req.params;




    if(!isNaN(namespace)) {
      Namespace.findAll({
        attributes: ['id','namespace','uri'],
        where: { id: namespace },
        include: [{
          model: Domain,
          attributes: ['id','domain','uri'],
          where: { id: domain },
          order: [['id','ASC']],
          include: [{
              model: Attribute,
              attributes: ['id','attribute','uri'],
              required: false,
              order: [['id','ASC']],
            }]
          }],
          // order: [[Attribute,Domain,'id','ASC']],
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
        attributes: ['id','namespace','uri'],
        where: { uri: namespace },
        include: [{
          model: Domain,
          attributes: ['id','domain','uri'],
          where: { uri: domain },
          order: [['id','ASC']],
          include: [{
              model: Attribute,
              attributes: ['id','attribute','uri'],
              required: false,
              order: [['id','ASC']]
            }],
          }],
          // order: [[Attribute,Domain,'id','ASC']],
        }).then((messages) => {
            if (messages.length === 0) {
                const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
                next(err);
            } else {
                res.send(messages);
            }
        })
        .catch(next);
    }
}

export default { getNamespace, getDomain, getAttribute };
