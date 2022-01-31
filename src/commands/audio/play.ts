import { CommandType } from "../../types/Command";

export const Command: CommandType = {
    name: 'play',
    execute: (req: any, res: any) => {
        res.status(200).send({
            type: 4,
            data: {
                content: "Currently this command is being rewritten to work with our new interaction systems!"
            }
        })
    }
}