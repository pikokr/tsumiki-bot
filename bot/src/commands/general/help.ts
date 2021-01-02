import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";

const categories = [
    {
        id: 'general',
        name: '기본',
        description: '기본 명령어들이에요!'
    }
]

export default class Help extends Command {
    constructor() {
        super('general__help', {
            aliases: ['도움', 'help', '도움말'],
            category: 'general'
        })
    }

    async exec(msg: Message) {
        const embed = new MessageEmbed()
        embed.setTitle('도움말')
        this.client.commandHandler.categories.keyArray().forEach(it => {
            const c = categories.find(r => r.id === it)
            if (c) {
                embed.addField(`!도움말 ${c.name}`, c.description)
            }
        })
        await msg.reply(embed)
    }
}