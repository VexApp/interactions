import { Server } from "./structs/Server";
const { PUBLIC_KEY } = require('./settings.json');

const server = new Server({
    port: 421,
    publicKey: PUBLIC_KEY
})

server.start();