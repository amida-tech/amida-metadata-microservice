import express from 'express'
import passport from 'passport'

import attributeCtrl from '../controllers/attribute.controller'

const router = express.Router() // eslint-disable-line new-cap

router.use(passport.authenticate('jwt', { session: false }))

router.route('/:UUID/')
  .get(attributeCtrl.get)
router.route('/:UUID/:namespace')
  .get(attributeCtrl.get)

export default router
