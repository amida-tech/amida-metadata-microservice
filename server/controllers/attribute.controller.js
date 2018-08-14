import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
const Op = Sequelize.Op;

function get(req, res, next) {
    let { UUID, namespace } = req.params;
    // if (type === undefined){
    //   type = Post.findAll({
    //
    // }

    Namespace.findAll({
    attributes: ['id','namespace'],
    where: { id: namespace },
    include: [{
      model: Domain, attributes: ['id','domain'],
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

export default { get };
