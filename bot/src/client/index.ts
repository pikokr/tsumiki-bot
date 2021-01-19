import DiscordClient from './DiscordClient'
import { Message, Team } from 'discord.js'
import Dokdo from 'dokdo'

export default class TsumikiClient {
  discord: DiscordClient
  config = require('../../../config.json')

  constructor() {
    this.discord = new DiscordClient(this)
  }

  async start() {
    await this.discord.login(this.config.discord.token)
    const discordApp = await this.discord.fetchApplication()
    let owners: string[]
    if (discordApp.owner instanceof Team) {
      owners = discordApp.owner.members.map(i=>i.id)
    } else {
      owners = [discordApp.owner!.id]
    }
    this.discord.ownerID = owners
    const dokdo = new Dokdo(this.discord, {
      noPerm(msg: Message): any {
        return msg.react('🚫')
      },
      owners,
      prefix: this.config.discord.defaultPrefix
    })
    this.discord.dokdo = dokdo
  }
}