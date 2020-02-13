const Koa = require('koa');
const http = require('http');
const util = require('util');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');
const models = require('./models');
const config = require('./config');
const ts = require('./utils/ts');

class Server {
  constructor() {
    const app = new Koa();

    app.use(bodyParser());
    app.use(routes.routes());

    const server = http.createServer(app.callback());
    this.app = app;
    this.server = server;
    this.listen = this.listen.bind(this);
    this.close = this.close.bind(this);
  }

  async listen(port) {
    await util.promisify(this.server.listen).bind(this.server)(port);
  }

  async close() {
    await util.promisify(this.server.close).bind(this.server);
  }
}

const app = new Server();

if (!module.parent) {
  (async () => {
    try {
      await Promise.all([
        models.sequelize.authenticate(),
        ts.connect(),
        app.listen(config.web.port),
      ]);
      if (process.send) process.send('ready');
      const { port } = app.server.address();
      config.setReadyState(true);
      console.log(`Server listening on ${port}`);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  })();
}

module.exports = app;
// Request ID
// Request Time
// https://github.com/indexzero/nconf
