import express from 'express';
import getRoutes from './get.route';
import getAttributesRoutes from './getAttributes.route';
import p from '../../package';

const router = express.Router(); // eslint-disable-line new-cap
const version = p.version.split('.').shift();

const baseURL = (version > 0 ? `/v${version}` : '');

/** GET /health-check - Check service health */
router.get(`${baseURL}/health-check`, (req, res) =>
  res.send('OK')
);

router.use(`${baseURL}/get`, getRoutes);
router.use(`${baseURL}/getAttributes`, getAttributesRoutes);
// router.use(`${baseURL}/register`, registerRoutes);
// router.use(`${baseURL}/set`, setRoutes);

export default router;
