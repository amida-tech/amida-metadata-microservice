import express from 'express';
// import namespaceRoutes from './namespace.route';
// import domainRoutes from './domain.route';
// import attributeRoutes from './attribute.route';
// import getRoutes from './get.route';
import getAttributesRoutes from './getAttributes.route';
import p from '../../package';

const router = express.Router(); // eslint-disable-line new-cap
const version = p.version.split('.').shift();

const baseURL = (version > 0 ? `/v${version}` : '');

/** GET /health-check - Check service health */
router.get(`${baseURL}/health-check`, (req, res) =>
  res.send('OK')
);

// router.use(`${baseURL}/namespace`, namespaceRoutes);
// router.use(`${baseURL}/domain`, domainRoutes);
// router.use(`${baseURL}/attribute`, attributeRoutes);

// router.use(`${baseURL}/get`, getRoutes);
router.use(`${baseURL}/getAttributes`, getAttributesRoutes);

// router.use(`${baseURL}/register`, registerRoutes);
// router.use(`${baseURL}/set`, setRoutes);

export default router;
