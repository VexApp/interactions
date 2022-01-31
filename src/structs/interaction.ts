import { InteractionData, InteractionMember, InteractionResponse } from "../types/discord";

export class Interaction {
    private req: any;
    private res: any;
    private _channelID: string  = "";
    private _applicationID: string = "";
    private _guildID: string = "";
    private _id: string = "";
    private _locale: string = "";
    private _version: number = 0;

    private _member: InteractionMember = { avatar: null, communication_disabled_until: null, deaf: false, is_pending: false, joined_at: '', mute: false, nick: null, pending: false, permissions: '', premium_since: null, roles: [], user: { avatar: '', discriminator: '', public_flags: 0, username: '', id: ''} };
    private _data: InteractionData = { id: '', name: '', type: 1, options: []};
    

    get channelID(): string { return this._channelID; }
    get guildID(): string { return this._guildID; }
    get id(): string { return this._id; }
    get locale(): string { return this._locale; }
    get version(): number { return this._version; }

    get member(): InteractionMember { return this._member; }
    get data(): InteractionData { return this._data; }


    constructor(req: any, res: any) {
        let d = req.body;

        this._channelID = d.channel_id || "";
        this._guildID = d.guild_id || "";
        this._id = d.id || "";
        this._locale = d.locale || "en-US";
        this._version = d.version || 1;
        this._member = d.member;
        this._data = d.data;

        this.req = req;
        this.res = res;
    }

    async reply(data: string | InteractionResponse) {
        if (typeof(data) == 'string') {
            console.log('reply')
            return this.res.status(200).send({
                type: 4,
                data: {
                    content: data,
                }
            })
        } else {
            console.log('reply')
            return this.res.status(200).send({
                type: 4,
                data
            })
        }
    }
}