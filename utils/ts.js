const { TeamSpeak, QueryProtocol } = require('ts3-nodejs-library');
const config = require('../config');

let teamspeakClient;

async function connect() {
  teamspeakClient = await TeamSpeak.connect({
    host: 'localhost',
    protocol: QueryProtocol.RAW,
    queryport: config.teamspeak.queryPort,
    serverport: config.teamspeak.port,
    username: config.teamspeak.user,
    password: config.teamspeak.password,
    nickname: 'NodeJS Query Framework',
  });
  await Promise.all([
    teamspeakClient.registerEvent('server'),
    teamspeakClient.registerEvent('channel', 0),
    teamspeakClient.registerEvent('textserver'),
    teamspeakClient.registerEvent('textchannel'),
    teamspeakClient.registerEvent('textprivate'),
  ]);
  const whoami = await teamspeakClient.whoami();
  const client = await teamspeakClient.getClientByUID(whoami.client_unique_identifier);
  await teamspeakClient.serverGroupAddPerm(client.servergroups[0], 'i_client_needed_poke_power', 0, undefined, undefined);
  teamspeakClient.on('clientmoved', (ev) => {
    if (ev.channel.name === 'support') {
      ev.client.message('\n1. Fick Dich Yawalla \n 2. Fick Dich Bobo');
    }
  });
  teamspeakClient.on('textmessage', async (ev) => {
    let channel;
    if (ev.invoker.type === 0) {
      switch (ev.msg) {
        case '1':
          channel = await teamspeakClient.getChannelByName('yawalla');
          ev.invoker.move(channel.cid);
          break;
        case '2':
          channel = await teamspeakClient.getChannelByName('bobo');
          ev.invoker.move(channel.cid);
          break;
        default:
          ev.invoker.message('Sorry ich verstehe dich nicht');
      }
    }
  });
  return teamspeakClient;
}

module.exports = {
  connect,
  get client() {
    if (!teamspeakClient) {
      throw new Error('Teamspeak client not initialized');
    }
    return teamspeakClient;
  },
};
