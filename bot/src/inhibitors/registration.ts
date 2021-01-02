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
        const data = await prisma.user.findFirst({where: {
            id: msg.author.id
        }})
        console.log(data)
        return false
    }
}