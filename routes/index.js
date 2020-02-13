const Router = require('@koa/router');
const sys = require('./system');
const teamspeak = require('./teamspeak');

const router = new Router();
router.use(sys.routes());
router.use(teamspeak.routes());

module.exports = router;
