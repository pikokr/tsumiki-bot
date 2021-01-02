import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";

const categories = [
  {
    id: "general",
    name: "기본",
    description: "기본 명령어들이에요!",
  },
];

export default class Help extends Command {
  constructor() {
    super("general__help", {
      aliases: ["도움말", 'help', '도움'],
      category: "general",
      args: [
        {
          id: "category",
          type: "string",
          default: null,
        },
      ],
    });
  }

  async exec(msg: Message, { category }: { category: string }) {
    const embed = new MessageEmbed();
    if (!category || !categories.find(it => it.name === category)) {
      embed.setTitle("도움말");
      this.client.commandHandler.categories.keyArray().forEach((it) => {
        const c = categories.find((r) => r.id === it);
        if (c) {
          embed.addField(`!도움말 ${c.name}`, c.description);
        }
      });
    } else {
        const c = categories.find(it => it.name === category)!
        embed.setTitle(c.name)
        embed.setDescription(c.description)
        embed.addFields(this.handler.findCategory(c.id).map(it => {
            return {
                name: it.aliases[0],
                value: it.description || '설명 없음'
            }
        }))
    }
    await msg.reply(embed);
  }
}
