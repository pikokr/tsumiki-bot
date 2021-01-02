import { Listener } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class extends Listener {
  constructor() {
    super('commandErrored', {
      emitter: 'commandHandler',
      event: 'error',
    })
  }

  async exec(err: Error, msg: Message) {
    if (err.stack) {
      msg.reply(
        new MessageEmbed()
          .setTitle('에러')
          .setDescription(
            '```\n' +
              (err.stack.length > 5000
                ? err.stack.slice(0, 5000) + '...'
                : err.stack) +
              '```'
          )
      )
    }
  }
}
