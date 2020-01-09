const Router = require('@koa/router');

const router = new Router({ prefix: '/v1/hello-world' });

router.get('/', (ctx) => {
  ctx.body = 'hello world';
});

module.exports = router;
