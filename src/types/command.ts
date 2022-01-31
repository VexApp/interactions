import { Interaction } from "../structs/interaction";

export type CommandType = {
    name: string,
    execute(interaction: Interaction): void
}