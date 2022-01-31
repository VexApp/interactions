import { EmbedBuilder } from "../../structs/builders";
import { Interaction } from "../../structs/interaction";
import { CommandType } from "../../types/command";

export const Command: CommandType = {
    name: 'ping',
    execute: (d: Interaction) => {
        let emb = new EmbedBuilder();
        emb.description("Pong! :ping_pong:")
        emb.colour(0xADD8E6);

        d.reply({ embeds: [emb.build] })
    }
}