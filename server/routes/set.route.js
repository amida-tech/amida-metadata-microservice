import express from 'express';
import passport from 'passport';

import setCtrl from '../controllers/set.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.use(passport.authenticate('jwt', { session: false }));


// Get data within a namespace for a user
router.route('/namespace/')
  .post(setCtrl.setNamespace);

router.route('/domain')
  .post(setCtrl.setDomain);

router.route('/attribute')
  .post(setCtrl.setAttribute);

router.route('/value')
  .post(setCtrl.setValue);


// Get data within a domain all data for a user
// router.route('/domain/:namespace/:domain/:description/:active/')
//   .get(setCtrl.setDomain);

export default router;
