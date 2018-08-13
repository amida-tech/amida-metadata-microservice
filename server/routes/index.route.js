import express from 'express';
import valueRoutes from './value.route';
import p from '../../package';

const router = express.Router(); // eslint-disable-line new-cap
const version = p.version.split('.').shift();
const baseURL = (version > 0 ? `/v${version}` : '');

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// router.use(`${baseURL}/type`, typeRoutes);
// router.use(`${baseURL}/attribute`, attributeRoutes);
router.use(`${baseURL}/value`, valueRoutes);

export default router;
