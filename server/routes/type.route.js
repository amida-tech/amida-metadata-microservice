import express from 'express';
import validate from 'express-validation';
import passport from 'passport';
import paramValidation from '../../config/param-validation';
import typeCtrl from '../controllers/type.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .get(typeCtrl.index);

export default router;
