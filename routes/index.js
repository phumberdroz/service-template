const Router = require('@koa/router');
const sys = require('./system');
const helloworld = require('./hello-world');

const router = new Router();
router.use(sys.routes());
router.use(helloworld.routes());

module.exports = router;
