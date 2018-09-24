import express from 'express';
import passport from 'passport';

import getAttributesCtrl from '../controllers/tree.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.use(passport.authenticate('jwt', { session: false }));

// Get namespaces
router.route('/')
  .get(getAttributesCtrl.getNamespace);

// Get domains
router.route('/:namespace')
  .get(getAttributesCtrl.getDomain);

// Get attributes
router.route('/:namespace/:domain')
  .get(getAttributesCtrl.getAttribute);

export default router;
