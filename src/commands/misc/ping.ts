import { CommandType } from "../../types/Command";

export const Command: CommandType = {
    name: 'ping',
    execute: (req: any, res: any) => {
        res.status(200).send({
            type: 4,
            data: {
                content: "Pong! :ping_pong:"
            }
        })
    }
}