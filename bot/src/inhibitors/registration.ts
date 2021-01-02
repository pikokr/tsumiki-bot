import { Inhibitor } from "discord-akairo";
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
            return true
        }
        return false
    }
}