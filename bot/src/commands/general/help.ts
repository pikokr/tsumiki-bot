import { Command } from 'discord-akairo'
import { Message, MessageEmbed } from 'discord.js'
import i18next from 'i18next'

export default class extends Command {
  constructor() {
    super('help', {
      aliases: ['도움말', 'help']
    })
  }

  async exec(msg: Message) {
    const embed = new MessageEmbed()
      .setDescription('도움말')
    return msg.reply(embed)
  }
}