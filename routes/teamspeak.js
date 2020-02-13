const Router = require('@koa/router');

const router = new Router({ prefix: '/v1/teamspeak' });

router.post('/message/:userId', (ctx) => {
  ctx.body = 'hello world';
});

module.exports = router;
