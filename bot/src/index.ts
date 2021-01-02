import dotenv from 'dotenv'
import { ShardingManager } from 'discord.js'
import Client from './client/Client'
import { PrismaClient } from '@prisma/client'
import path from 'path'

dotenv.config({
  path: path.resolve(path.join(__dirname, '..')),
})

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

process.on('unhandledRejection', console.error)
process.on('uncaughtException', console.error)

if (process.env.SHARDING_MANAGER) {
  global.prisma = new PrismaClient()
  const client = new Client()
  client.login(process.env.BOT_TOKEN)
} else {
  const manager = new ShardingManager(__filename, {
    execArgv: __filename.endsWith('.ts') ? ['-r', 'ts-node/register'] : [],
    token: process.env.BOT_TOKEN,
  })
  manager.spawn()
}
