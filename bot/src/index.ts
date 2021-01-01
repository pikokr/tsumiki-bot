import 'dotenv/config'
import { ShardingManager } from "discord.js";
import Client from './client/Client';

process.on('unhandledRejection', console.error)
process.on('uncaughtException', console.error)

if (process.env.SHARDING_MANAGER) {
    const client = new Client()
    client.login(process.env.BOT_TOKEN)
} else {
    const manager = new ShardingManager(__filename, {
        execArgv: __filename.endsWith('.ts') ? ['-r', 'ts-node/register'] : [],
        token: process.env.BOT_TOKEN
    })
    manager.spawn()
}