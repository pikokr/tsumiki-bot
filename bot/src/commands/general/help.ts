import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

const categories = [
  {
    id: 'general',
    name: '기본',
    description: '기본 명령어들이에요!',
  },
]

export default class Help extends Command {
  constructor() {
    super('general__help', {
      aliases: ['도움말', 'help', '도움'],
      category: 'general',
      args: [
        {
          id: 'category',
          type: 'string',
          default: null,
        },
        {
          id: 'command',
          type: 'string',
          default: null,
        },
      ],
    })
  }

  async exec(
    msg: Message,
    { category, command }: { category: string; command: string }
  ) {
    const embed = msg.embed()
    if (!category || !categories.find((it) => it.name === category)) {
      embed.setTitle('도움말')
      this.client.commandHandler.categories.keyArray().forEach((it) => {
        const c = categories.find((r) => r.id === it)
        if (c) {
          embed.addField(`!도움말 ${c.name}`, c.description)
        }
      })
    } else {
      const c = categories.find((it) => it.name === category)!
      if (
        !command ||
        !this.handler
          .findCategory(c.id)
          .find((r) => r.id === command || r.aliases.includes(command))
      ) {
        embed.setTitle(c.name)
        embed.setDescription(c.description)
        embed.addFields(
          this.handler.findCategory(c.id).map((it) => {
            return {
              name: it.aliases[0],
              value: it.description || '설명 없음',
              inline: true,
            }
          })
        )
        embed.setFooter(
          '더 자세히 알아보려면 ]도움말 <카테고리> <명령어>를 입력해주세요'
        )
      } else {
        const cmd = this.handler
          .findCategory(c.id)
          .find((r) => r.id === command || r.aliases.includes(command))!
        embed.setTitle(`${c.name} - ${cmd.aliases[0]}`)
        embed.setDescription(cmd.description || '설명 없음')
        embed.addField(
          '별칭',
          cmd.aliases.map((it) => '`' + it + '`').join(', '),
          true
        )
      }
    }
    await msg.reply(embed)
  }
}
