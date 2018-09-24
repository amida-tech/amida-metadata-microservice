import express from 'express';
import passport from 'passport';

import getCtrl from '../controllers/get.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.use(passport.authenticate('jwt', { session: false }));

// Get all data for a user
router.route('/:uuid/')
  .get(getCtrl.getUUID);

// Get data within a namespace for a user
router.route('/:uuid/:namespace')
  .get(getCtrl.getNamespace);

// Get data within a domain all data for a user
router.route('/:uuid/:namespace/:domain')
  .get(getCtrl.getDomain);

// Get data within an attribute all data for a user
router.route('/:uuid/:namespace/:domain/:attribute')
    .get(getCtrl.getAttribute);

export default router;
