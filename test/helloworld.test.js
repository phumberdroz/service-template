/* global describe it beforeAll */
const supertest = require('supertest');
const app = require('../server');
const models = require('../models');

const request = supertest(app.server);
describe('/v1', () => {
  beforeAll(() => models.sequelize.sync({ force: true }));

  it('GET /hello-world', () => request
    .get('/v1/hello-world')
    .expect(200));
});
