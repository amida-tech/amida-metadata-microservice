import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Type = db.Type;


function index(req, res, next) {
    // if (type === undefined){
    //   type = Post.findAll({
    //
    // }

    Type.findAll({
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

export default { index };
