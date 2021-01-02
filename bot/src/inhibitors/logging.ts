import { Command, Inhibitor } from "discord-akairo";
import { Message } from "discord.js";

export default class extends Inhibitor {
    constructor() {
        super('logging', {
            reason: 'logging',
        })
    }

    async exec(msg: Message, cmd: Command) {
        console.log(`[COMMAND LOG][${msg.author.tag}][COMMAND: ${cmd.id}] ${msg.content}`)
        return false
    }
}