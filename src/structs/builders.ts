import { Embed, EmbedAuthor, EmbedField, EmbedFooter, EmbedImage } from "../types/discord";

export class EmbedBuilder {
    private _title: string = ""; // Done
    private _description: string = ""; // Done
    private _color: number | undefined = undefined; // Done
    private _url: string = ""; // Done
    private _author: EmbedAuthor = { name: '', icon_url: ''}; // Done
    private _footer: EmbedFooter = { text: '', icon_url: ''} // Done
    private _fields: Array<EmbedField> = []; // Done
    private _image: EmbedImage = { url: ''} // Done
    private _timestamp: Date | undefined = undefined;


    constructor() {}

    title(data: string) { this._title = data; }
    description(data: string) { this._description = data; }
    colour(data: number) { this._color = data; }
    url(data: string) { this._url = data; }
    author(name: string, avatar: string, url?: string) { this._author.name = name; this._author.icon_url = avatar; this._author.url = url; }
    footer(name: string, avatar: string) {this._footer.text = name, this._footer.icon_url = avatar; }
    addField(title: string, value: string, inline?: boolean) { this._fields.push({ name: title, value: value, inline: inline }); }
    image(url: string) { this._image.url = url; }
    timestamp() { this._timestamp = new Date(); }

    get build(): Embed {
        return {
            color: this._color,
            title: this._title,
            url: this._url,
            author: this._author,
            description: this._description,
            fields: this._fields,
            image: this._image,
            timestamp: this._timestamp,
            footer: this._footer
        }
    }
}