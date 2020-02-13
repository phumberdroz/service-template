const path = require('path');

const env = require('dotenv-extended').load({
  path: path.join(__dirname, '..', '.env'),
  defaults: path.join(__dirname, '..', '.env.defaults'),
  schema: path.join(__dirname, '..', '.env.schema'),
  errorOnMissing: true,
  errorOnExtra: true,
});

const config = {
  database: {
    user: env.DB_USER,
    password: env.DB_PASS,
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    dialect: 'postgres',
    logging: false,
  },
  web: {
    port: env.WEB_PORT,
  },
  teamspeak: {
    user: env.TS_USER,
    password: env.TS_PASS,
    host: env.TS_HOST,
    port: env.TS_PORT,
    queryPort: env.TS_QUERY_PORT,
  },
  ready: false,
  setReadyState: (state) => {
    this.ready = state;
  },
  getReadyState: () => this.ready,
};

module.exports = config;
