const express = require("express");
const nacl = require('tweetnacl');
const { PUBLIC_KEY } = require("./settings.json");
const bodyParser = require("body-parser")
const nodeFetch = require('node-fetch');

const app = express();

const API = "https://discord.com/api/v8/interactions/"

app.use(bodyParser.json({
    verify: (req: any, res: any, buf: any) => {
      req.rawBody = buf
    }
  }))


app.get("/", async (req: Request, res: any) => {
    res.send({ data: "Hello, World!"});
})

import { LoadInteractions } from "./handlers/loader"

let commands = LoadInteractions();

app.post("/", async(req: any, res: any) => {
    const signature = req.headers['x-signature-ed25519'];
    const timestamp = req.headers['x-signature-timestamp'];
    const rawBody = req.rawBody;

    const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + rawBody),
        Buffer.from(signature, 'hex'),
        Buffer.from(PUBLIC_KEY, 'hex')
    )

    if (!isVerified) { console.log("Invalid signature recieved"); return res.status(401).send('invalid request signature'); }
    if (req.body.type != 1) {
        console.log(`Recieved ${req.body.data.name} interaction!`)
        let command = commands.get(req.body.data.name);
        
        if (!command) return res.status(200).send({
            type: 4,
            data: {
                content: "Command unavailable."
            }
        })
        command.execute(req, res);
        
    } else {
        console.log("Recieved ACK Ping!")
        res.send({ type: 1});
    }
})

app.listen(421, () => console.log("App started on port 421!"))