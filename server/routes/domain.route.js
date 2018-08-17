import express from 'express';
import passport from 'passport';

import domainCtrl from '../controllers/domain.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
    .get(domainCtrl.index);

router.route('/:namespace')
    .get(domainCtrl.index);


export default router;
