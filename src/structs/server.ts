const express = require('express');
import { EmbedBuilder } from "./builders";
import { LoadInteractions } from "../handlers/loader";
import { CommandType } from "../types/command";
import { Settings } from "../types/Server";
import { Interaction } from "./interaction";
const nacl = require('tweetnacl');
const bodyParser = require("body-parser")


export class Server {
    private server: any;
    private settings: Settings;
    private api: string = "https://discord.com/api/v9/";
    private interactions: Map<string, CommandType>;

    constructor(settings: Settings) {
        if (!settings.publicKey) new Error("Please provide an public key!");
        
        this.settings = settings;
        this.settings.port = settings.port || 4000;
        this.interactions = LoadInteractions();
    }

    start() {
        this.server = express();

        // Middleware
        this.server.use(bodyParser.json({
            verify: (req: any, res: any, buf: any) => {
              req.rawBody = buf
            }
        }))

        this.server.listen(this.settings.port, () => console.log(`Server started @ http://localhost:${this.settings.port}`))
        this.index()
    }

    private index() {
        // POST Index route.
        this.server.post('/', async (req: any, res: any) => {
            // Validate requestion
            if (!this.validate(req)) return res.status(400).send("invalid request signature").then(() => console.log("invalid request signature recieved"));

            switch(req.body.type) {
                case 1:
                    // Acknowledge ping
                    res.status(200).send({
                        type: 1
                    });
                    break;

                case 2:
                    // Handle application command

                    let d = new Interaction(req, res);

                    let interaction = this.interactions.get(req.body.data.name);
                    if (!interaction) return res.status(400).send("unkown interaction");

                    try {
                        interaction.execute(d);
                    } catch (err) {
                        console.log(err);

                        let errorEmbed = new EmbedBuilder();
                        errorEmbed.timestamp();
                        errorEmbed.title("Something went south!");
                        errorEmbed.description("Sorry, but something has gone very wrong on our end. Please retry this interaction and if the error persist, please contact our [support](https://vex.wtf/support).");
                        errorEmbed.colour(0xFF0000);


                        d.reply({ embeds: [errorEmbed.build], flags: 1<<6 })

                    }

                    break;

                case 3:
                    // Message component
                    break;

                case 4:
                    // Application command autocomplete
                    break;
            
                default:
                    res.status(400).send("invalid action");
            }

        })
    }

    private validate(req: any) {
        const signature = req.headers['x-signature-ed25519'];
        const timestamp = req.headers['x-signature-timestamp'];
        const rawBody = req.rawBody;

        const isVerified = nacl.sign.detached.verify(
            Buffer.from(timestamp + rawBody),
            Buffer.from(signature, 'hex'),
            Buffer.from(this.settings.publicKey, 'hex')
        )

        return isVerified;
    }


}