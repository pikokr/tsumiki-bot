import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import i18next from 'i18next'

export default class extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload', 'rl'],
      ownerOnly: true
    })
  }

  async exec(msg: Message) {
    const c = this.client
    c.commandHandler.categories.map(r=>r.removeAll())
    c.listenerHandler.categories.map(r=>r.removeAll())
    c.inhibitorHandler.categories.map(r=>r.removeAll())
    c.listenerHandler.loadAll()
    c.inhibitorHandler.loadAll()
    c.commandHandler.loadAll()
    await i18next.reloadResources()
    await msg.react('✅')
  }
}