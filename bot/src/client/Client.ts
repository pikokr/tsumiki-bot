import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from "discord-akairo";
import path from "path";
import Dokdo from 'dokdo'

declare module 'discord.js' {
    interface Client {
        dokdo?: Dokdo
        commandHandler: CommandHandler
        listenerHandler: ListenerHandler
        inhibitorHandler: InhibitorHandler
    }
}

export default class Client extends AkairoClient {
    constructor() {
        super({
            restTimeOffset: 0
        })
        this.listenerHandler = new ListenerHandler(this, {
            directory: path.resolve(path.join(__dirname, '../listeners')),
        })
        this.commandHandler = new CommandHandler(this, {
            directory: path.resolve(path.join(__dirname, '../commands')),
            prefix: process.env.COMMAND_PREFIX
        })
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: path.resolve(path.join(__dirname, '../inhibitors')),
        })
        this.listenerHandler.loadAll()
        this.commandHandler.loadAll()
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.inhibitorHandler.loadAll()
    }
}