export type EmbedAuthor = { name: string, icon_url: string, url?: string }
export type EmbedField = { name: string, value: string, inline?: boolean }
export type EmbedFooter = { text: string, icon_url: string }
export type EmbedImage = { url: string }

export type User = { avatar: string, discriminator: string, id: string, public_flags: number, username: string}

export type Embed = {title: string, description: string, color: number | undefined, url: string, author: EmbedAuthor, footer: EmbedFooter, image: EmbedImage, timestamp: Date | undefined, fields: Array<EmbedField>}

export type InteractionOption = { name: string, type: number, value: string }
export type InteractionData = { id: string, name: string, type: number, options?: Array<InteractionOption> }
export type InteractionMember = { avatar: string | null, communication_disabled_until: any | null, deaf: boolean, is_pending: boolean, joined_at: string, mute: false, nick: string | null, pending: boolean, permissions: string, premium_since: string | null, roles: Array<any>, user: User }
export type InteractionResponse = { content?: string, embeds?: Array<Embed>, flags?: number}