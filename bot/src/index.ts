import { ShardingManager } from 'discord.js'
import TsumikiClient from './client'
import Logger from './util/Logger'

Logger.patch()

if (process.env.SHARDING_MANAGER) {
  const client = new TsumikiClient()

  client.start().then(async () => console.log(`Shard ${client.discord.shard!.ids.reduce((acc,cur) => acc+cur)} ready!`))
} else {
  const conf = require('../../config.json')

  const manager = new ShardingManager(__filename, {
    execArgv: __filename.endsWith('.ts') && ['-r', 'ts-node/register'] || undefined,
    respawn: true,
    token: conf.discord.token
  })

  manager.spawn()
}