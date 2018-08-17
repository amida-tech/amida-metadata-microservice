import express from 'express';
import passport from 'passport';

import getCtrl from '../controllers/get.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.use(passport.authenticate('jwt', { session: false }));

// Get all data for a user
router.route('/:UUID/')
    .get(getCtrl.get);

// Get data within a namespace for a user
router.route('/:UUID/:namespace')
    .get(getCtrl.get);

// Get data within a domain all data for a user
router.route('/:UUID/:namespace/:domain')
    .get(getCtrl.get);

// Get data within an attribute all data for a user
router.route('/:UUID/:namespace/:domain/:attribute')
    .get(getCtrl.get);

export default router;
