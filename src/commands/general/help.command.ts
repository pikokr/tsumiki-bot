import {Command} from "../../tools/bot/typings";
import config from '../../config';

const cmd : Command = {
    name: '도움말',
    aliases: ['도움말', '도움', 'help'],
    owner: false,
    async run(client, msg) {
        if (!config.bot.owners.includes(msg.author.id)) {
            const embed = msg.embed()
            embed.setTitle('도움말')
            const categories = Array.from(new Set(client.commands.map(r => r.category)))
            categories.filter(r => r !== 'dev').forEach(category => {
                embed.addField(category, '`' + client.commands.filter(r => r.category === category).map(r => r.name).join('` `') + '`')
            })
            return msg.reply('', embed)
        } else {
            const embed = msg.embed()
            embed.setTitle('도움말')
            const categories = Array.from(new Set(client.commands.map(r => r.category)))
            categories.forEach(category => {
                embed.addField(category, '`' + client.commands.filter(r => r.category === category).map(r => r.name).join('` `') + '`')
            })
            return msg.reply('', embed)
        }
    }
}

export default cmd