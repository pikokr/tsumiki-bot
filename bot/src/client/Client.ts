import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from "discord-akairo";
import path from "path";
import Dokdo from 'dokdo'
import i18n from 'discord-i18n'
import prisma from "@prisma/client";
import { Message } from "discord.js";

declare module 'discord.js' {
    interface Client {
        dokdo?: Dokdo
        commandHandler: CommandHandler
        listenerHandler: ListenerHandler
        inhibitorHandler: InhibitorHandler
        i18n: i18n.Client
    }
    interface Message {
        user: prisma.User
        fetchData: () => Promise<void>
    }
}

Message.prototype.fetchData = async function() {
    const {prisma} = global
    const user = await prisma.user.findFirst({
        where: {
            id: this.author.id
        }
    })
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
        this.i18n = new i18n.Client()
        this.i18n.configure({
            directory: path.join(__dirname, '../locales'),
            locales: ['ko'],
        })
        this.listenerHandler.loadAll()
        this.commandHandler.loadAll()
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.inhibitorHandler.loadAll()
    }
}