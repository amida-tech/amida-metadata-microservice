import express from 'express';
import namespaceRoutes from './namespace.route';
import attributeRoutes from './attribute.route';
import dataRoutes from './data.route';
import p from '../../package';

const router = express.Router(); // eslint-disable-line new-cap
const version = p.version.split('.').shift();

const baseURL = (version > 0 ? `/v${version}` : '');

/** GET /health-check - Check service health */
router.get(`${baseURL}/health-check`, (req, res) =>
  res.send('OK')
);

router.use(`${baseURL}/attribute`, attributeRoutes);
router.use(`${baseURL}/namespace`, namespaceRoutes);
router.use(`${baseURL}/attribute`, attributeRoutes);
router.use(`${baseURL}/data`, dataRoutes);

export default router;
