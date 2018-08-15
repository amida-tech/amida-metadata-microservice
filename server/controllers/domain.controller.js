import httpStatus from 'http-status';
import Sequelize from 'sequelize';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Domain = db.Domain;


function index(req, res, next) {
    // if (type === undefined){
    //   type = Post.findAll({
    //
    // }

    Domain.findAll({
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
