const tmi = require('tmi.js');
const Bancho = require('bancho.js')
const BanchoUser = require("bancho.js/lib/BanchoUser.js")

const {
    TWITCH_USERNAME,
    TWITCH_OAUTH,
    TWITCH_CHANNELS,
    BANCHO_USERNAME,
    BANCHO_PASSWORD
} = require("./settings");

// twitch config
const twitch_opts = {
  identity: {
    username: TWITCH_USERNAME,
    password: TWITCH_OAUTH
  },
  channels: TWITCH_CHANNELS
};

// bancho config
const bancho_opts = {
    username: BANCHO_USERNAME,
    password: BANCHO_PASSWORD
}

// init client
const twitch_client = new tmi.client(twitch_opts);
const bancho_client = new Bancho.BanchoClient(bancho_opts);

// recipient config
console.log(BanchoUser)
let recipient = new BanchoUser(bancho_client, BANCHO_USERNAME);

// register event handlers
twitch_client.on('message', onMessageHandler);
twitch_client.on('connected', onConnectedHandler);

const startBanchoBot = async () => {
    try {
        await bancho_client.connect();
        console.log("osu bot connected")
    } catch(err) {
        console.error(err);
    }
}

// connect
twitch_client.connect();
startBanchoBot();

// message handler
function onMessageHandler (target, context, msg, self) {
    if (self) { return; }
    console.log(context.username + ": " + msg);
    recipient.sendMessage(context.username + ": " + msg);
}

// connection log
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

