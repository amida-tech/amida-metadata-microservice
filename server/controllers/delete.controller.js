import httpStatus from 'http-status';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
const Value = db.Value;
// const Op = Sequelize.Op;


// return Model
//     .findOne({ where: condition })
//     .then(function(obj) {
//         if(obj) { // update
//             return obj.update(values);
//         }
//         else { // insert
//             return Model.create(values);
//         }
//     }
// })

function setNamespace(req, res, next) {
    const { namespace, description, active } = req.params;
    if (!namespace || !description) {
        Namespace.findOne({ where: namespace })
        .then((data) => {
            if (data) {
                data.update(namespace, description, active)
                .then((dataUpdate) => {
                    res.send(dataUpdate);
                });
            } else {
                Namespace.create(namespace, description, active)
                .then((dataCreate) => {
                    res.send(dataCreate);
                });
            }
        })
        .catch(next);
    } else if (!namespace) {
        const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
        next(err);
    } else if (!description) {
        const err = new APIError('There were no results', 'NO_RESULTS', httpStatus.NOT_FOUND, true);
        next(err);
    }
}

function setDomain(req, res, next) {
    const { namespace, domain, description, active } = req.params;

}

function setAttribute(req, res, next) {
    const { domain, attribute, description, active } = req.params;
}

function setValue(req, res, next) {
    const { attribute, value, description, active, type } = req.params;

}


export default { setNamespace, setDomain, setAttribute, setValue };
