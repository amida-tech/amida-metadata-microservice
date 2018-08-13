import express from 'express';
import passport from 'passport';

import valueCtrl from '../controllers/value.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.use(passport.authenticate('jwt', { session: false }));

router.route('/:UUID/')
    .get(valueCtrl.get);
router.route('/:UUID/:type')
    .get(valueCtrl.get);




export default router;
