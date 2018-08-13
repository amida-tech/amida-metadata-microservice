import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Value = db.Value;

function get(req, res, next) {
    const { UUID } = req.UUID;
    Value.findAll({
            where: {
                UUID: req.params.originalMessageId,
            },
        })
        .then((messages) => {
            if (messages.length === 0) {
                const err = new APIError('Original message does not exist', 'MESSAGE_NOT_EXIST', httpStatus.NOT_FOUND, true);
                next(err);
            } else {
                res.send(messages);
            }
        })
        .catch(next);
}

export default { get };
