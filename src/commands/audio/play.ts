import { Interaction } from "../../structs/interaction";
import { CommandType } from "../../types/command";

export const Command: CommandType = {
    name: 'play',
    execute: (d: Interaction) => {
        d.reply("Sorry, but currently this command is unavailable and is being rewritten to work with our new system!");
    }
}