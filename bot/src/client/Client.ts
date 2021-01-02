import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import path from "path";
import Dokdo from 'dokdo'

declare module 'discord.js' {
    interface Client {
        dokdo?: Dokdo
    }
}

export default class Client extends AkairoClient {
    commandHandler = new CommandHandler(this, {
        directory: path.resolve(path.join(__dirname, '../commands')),
        prefix: process.env.COMMAND_PREFIX
    })

    listenerHandler = new ListenerHandler(this, {
        directory: path.resolve(path.join(__dirname, '../listeners')),
    })

    constructor() {
        super({
            restTimeOffset: 0
        })
        this.listenerHandler.loadAll()
        this.commandHandler.loadAll()
    }
}