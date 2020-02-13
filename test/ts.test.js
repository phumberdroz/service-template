/* global describe it expect beforeAll */
const { TeamSpeak, QueryProtocol } = require('ts3-nodejs-library');
const ts = require('../utils/ts');
const config = require('../config');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const retryOperation = (operation, delay, times) => new Promise((resolve, reject) => operation()
  .then(resolve)
  .catch((reason) => {
    if (times - 1 > 0) {
      return wait(delay)
        .then(retryOperation.bind(null, operation, delay, times - 1))
        .then(resolve)
        .catch(reject);
    }
    return reject(reason);
  }));

let teamspeakUser;
const messages = [];
describe('Teamspeak Client', () => {
  beforeAll(async () => {
    teamspeakUser = await TeamSpeak.connect({
      host: 'localhost',
      protocol: QueryProtocol.RAW,
      queryport: config.teamspeak.queryPort,
      serverport: config.teamspeak.port,
      username: config.teamspeak.user,
      password: config.teamspeak.password,
      nickname: 'test user',
    });
    await Promise.all([
      teamspeakUser.registerEvent('textprivate'),
    ]);
    teamspeakUser.on('textmessage', (ev) => {
      console.log(ev.msg);
      messages.push(ev);
    });
  });
  it('should throw an expection if not initialized', () => {
    expect(() => ts.client).toThrow(Error);
  });

  it('should be able to connect and send messages', async () => {
    await ts.connect();
    const { client } = ts;
    const clients = await client.clientList();
    const testUser = clients.find((user) => user.nickname === 'test user');
    await testUser.message('Hello!');
    const test = await retryOperation(() => new Promise((res, rej) => {
      const found = messages.find((msg) => msg.msg === 'Hello!');
      if (found === undefined) {
        return rej();
      }
      console.log(found);
      return res(found);
    }), 1000, 5);
    console.log(test);
    expect(test.msg).toBe('Hello!');
  });
});
