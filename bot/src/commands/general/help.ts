import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import i18next from 'i18next'

export default class extends Command {
  constructor() {
    super('help', {
      aliases: ['도움말', 'help', '도움']
    })
  }

  async exec(msg: Message) {
    if (!msg.util) return
    const embed = new MessageEmbed().setTitle(msg.util.t('common:help.title'))
    return msg.reply(embed)
  }
}