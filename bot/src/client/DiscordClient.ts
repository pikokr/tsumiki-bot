import { AkairoClient } from 'discord-akairo'
import TsumikiClient from './index'

declare module 'discord.js' {
  interface Client {
    client: TsumikiClient
  }
}

export default class DiscordClient extends AkairoClient {
  constructor(client: TsumikiClient) {
    super({
      disableMentions: 'everyone',
    })
    this.client = client
  }
}
