import httpStatus from 'http-status';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
// const Op = Sequelize.Op;


function index(req, res, next) {
    const { namespace } = req.params;

    if (!isNaN(namespace)) {
        Domain.findAll({
            where: { NamespaceId: namespace },
            order: [['id', 'ASC']],
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
            where: { uri: namespace },
        }).then((data) => {
            Domain.findAll({
                where: { NamespaceId: data[0].dataValues.id },
                order: [['id', 'ASC']],
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
        });
    }
}

export default { index };
