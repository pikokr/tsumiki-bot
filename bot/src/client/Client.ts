import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import path from "path";

export default class Client extends AkairoClient {
    commandHandler = new CommandHandler(this, {
        directory: path.resolve(path.join(__dirname, '../commands'))
    })

    listenerHandler = new ListenerHandler(this, {
        directory: path.resolve(path.join(__dirname, '../listeners'))
    })

    constructor() {
        super({
            disableMentions: 'everyone',
        })
    }
}