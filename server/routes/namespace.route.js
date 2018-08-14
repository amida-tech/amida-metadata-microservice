import express from 'express';
import validate from 'express-validation';
import passport from 'passport';
import paramValidation from '../../config/param-validation';
import namespaceCtrl from '../controllers/namespace.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .get(namespaceCtrl.index);

export default router;
