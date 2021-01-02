import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class Help extends Command {
    constructor() {
        super('general__help', {
            aliases: ['도움', 'help', '도움말'],
        })
    }

    exec(msg: Message) {
        msg.reply('테스트')
    }
}