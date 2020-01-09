/* global describe it beforeAll */
const supertest = require('supertest');
const app = require('../server');
const models = require('../models');
const config = require('../config');

const request = supertest(app.server);

describe('/system', () => {
  beforeAll(() => models.sequelize.sync({ force: true }));

  it('GET /healthz', () => request
    .get('/system/healthz')
    .expect(200));

  it('GET /healthy', () => {
    config.setReadyState(true);
    return request
      .get('/system/healthy')
      .expect(200);
  });

  it('GET /healhy when not ready', () => {
    config.setReadyState(false);
    return request
      .get('/system/healthy')
      .expect(500);
  });
});
