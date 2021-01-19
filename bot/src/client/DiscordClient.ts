import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo'
import TsumikiClient from './index'
import * as path from 'path'
import Dokdo from 'dokdo'

declare module 'discord.js' {
  interface Client {
    client: TsumikiClient
    commandHandler: CommandHandler
    listenerHandler: ListenerHandler
    inhibitorHandler: InhibitorHandler
    dokdo: Dokdo
  }
}

export default class DiscordClient extends AkairoClient {
  constructor(client: TsumikiClient) {
    super({
      disableMentions: 'everyone',
      restTimeOffset: 0
    })
    this.client = client
    const root = path.resolve(path.join(__dirname, '..'))
    this.listenerHandler = new ListenerHandler(this, {
      directory: path.join(root, 'events'),
      automateCategories: true
    })
    this.commandHandler = new CommandHandler(this, {
      directory: path.join(root, 'commands'),
      automateCategories: true,
      commandUtil: true,
      prefix: this.client.config.discord.defaultPrefix
    })
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: path.join(root, 'inhibitors'),
      automateCategories: true
    })
    this.listenerHandler.setEmitters({
      client: this,
      listenerHandler: this.listenerHandler,
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler
    })
    this.listenerHandler.loadAll()
    this.inhibitorHandler.loadAll()
    this.commandHandler.loadAll()
    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
  }
}
