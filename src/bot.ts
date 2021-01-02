import {Client, Message, MessageEmbed, Collection} from 'discord.js';
import config from './config';
import {Command} from "./tools/bot/typings";
import fs from 'fs';
import path from 'path';

const client = new Client()

Message.prototype.embed = function (msg='') {
    return new MessageEmbed().setColor('#fffe').setDescription(msg).setFooter(this.author.tag, this.author.avatarURL({dynamic: true}) || undefined)
}

client.commands = new Collection()

client.aliases = new Collection()

client.reloadCommands = function () {
    this.commands.clear()
    this.aliases.clear()
    Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
    fs.readdirSync(path.join(__dirname, 'commands')).forEach(dir => {
        const filter = fs.readdirSync(path.join(__dirname, 'commands', dir)).filter(r => r.endsWith('.command.ts') || r.endsWith('.command.js'))
        filter.forEach(f => {
            const cmd: Command = require(path.join(__dirname, 'commands', dir, f)).default
            if (!cmd.perms) cmd.perms = []
            if (!cmd.owner) cmd.owner = false
            this.commands.set(cmd.name, {
                name: cmd.name,
                aliases: cmd.aliases,
                category: dir,
                owner: cmd.owner,
                perms: cmd.perms,
                run: cmd.run
            })
            console.log(`Register command: ${cmd.name}`)
            cmd.aliases.forEach(alias => this.aliases.set(alias, cmd.name))
        })
    })
}

client.on('ready', () => {
    if (!client.shard) {
        console.error('shard only!')
        return process.exit(0)
    }
})

client.on('message', msg => require('./tools/bot/handler').default(client, msg))

client.reloadCommands()

client.on('warn', (e) => console.warn(e))

client.on('error', (e) => console.error(e.message))

client.on('debug', (e) => console.debug(e))

client.login(config.bot.token)