import { Inhibitor } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";

export default class extends Inhibitor {
    constructor() {
        super('registration', {
            reason: 'registration'
        })
    }

    async exec(msg: Message) {
        const { prisma } = global
        if (!await prisma.user.findFirst({where: {
            id: msg.author.id
        }})) {
            const embed = new MessageEmbed()
            embed.setTitle('')
            return true
        }
        return false
    }
}