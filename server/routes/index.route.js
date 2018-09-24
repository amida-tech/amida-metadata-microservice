import express from 'express';
import setRoutes from './set.route';
import getRoutes from './get.route';
import viewRoutes from './view.route';
import p from '../../package';

const router = express.Router(); // eslint-disable-line new-cap
const version = p.version.split('.').shift();

const baseURL = (version > 0 ? `/v${version}` : '');

/** GET /health-check - Check service health */
router.get(`${baseURL}/health-check`, (req, res) =>
  res.send('OK')
);

router.use(`${baseURL}/`, setRoutes);
router.use(`${baseURL}/`, getRoutes);
router.use(`${baseURL}/view`, viewRoutes);


export default router;
