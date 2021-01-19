import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class extends Command {
  constructor() {
    super('dokdo', {
      aliases: ['dok', 'dokdo']
    })
  }

  async exec(msg: Message) {
    return this.client.dokdo.run(msg)
  }
}