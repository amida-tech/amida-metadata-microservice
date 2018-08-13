import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Type = db.Type;
const Attribute = db.Attribute;
const Value = db.Value;

function get(req, res, next) {
    const { UUID, type } = req.params;
    Type.findAll({
    attributes: ['id', 'type'],
    where: { id: type },
    include: [{
      model: Attribute, attributes: ['id', 'attribute'],
      include: [{
          model: Value,
          attributes: ['id','value'],
          where: {
            UUID
          },
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
