import httpStatus from 'http-status';
import db from '../../config/sequelize';
import APIError from '../helpers/APIError';

const Namespace = db.Namespace;
const Domain = db.Domain;
const Attribute = db.Attribute;
const Value = db.Value;
// const Op = Sequelize.Op;

function setNamespace(req, res, next) {
  const { namespace, description, active } = req.params;
}

function setDomain(req, res, next) {
  const { namespace, domain, description, active } = req.params;

}

function setAttribute(req, res, next) {
  const { domain, attribute, description, active } = req.params;
}

function setValue(req, res, next) {
  const { attribute, value, description, active } = req.params;

}


export default { setNamespace, setDomain, setAttribute, setValue };
