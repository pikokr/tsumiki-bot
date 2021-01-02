import { ReactionCollector } from 'discord.js';
import {Client, Message} from 'discord.js';
import config from '../../config';
export default async (client: Client, msg: Message) => {
    const prefix = config.bot.prefix
    if (!msg.guild || msg.author.bot || !msg.content.startsWith(prefix)) return
    const args = msg.content.slice(prefix.length).split(/ +/g)
    const command = args.shift()!
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)!)
    if (!cmd) return
    msg.args = args
    if (!msg.member!.hasPermission(cmd.perms)) {
        return msg.react('❎')
    }
    if (!config.bot.owners.includes(msg.author.id) && cmd.owner) {
        return msg.react('❎')
    }
    await cmd.run(client, msg)
}