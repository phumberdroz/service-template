const Router = require('@koa/router');
const models = require('../models');
const { getReadyState } = require('../config');

const router = new Router({ prefix: '/system' });

router.get('/healthz', async (ctx) => {
  try {
    await Promise.all([
      models.sequelize.authenticate(),
    ]);
    ctx.body = { success: true };
  } catch (e) {
    ctx.status = 500;
    ctx.body = { success: false };
  }
});

router.get('/healthy', (ctx) => {
  if (getReadyState()) {
    ctx.body = { success: true };
  } else {
    ctx.status = 500;
    ctx.body = { success: false };
  }
});

module.exports = router;
