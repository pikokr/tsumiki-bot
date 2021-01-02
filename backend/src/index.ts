import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import dotenv from 'dotenv'
import { buildSchema } from 'type-graphql'
import { QueryResolver } from './resolvers/QueryResolver'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '../.env') })
;(async () => {
  const schema = await buildSchema({
    resolvers: [QueryResolver],
  })
  const server = new ApolloServer({
    schema,
  })
  server.listen(process.env.BACKEND_PORT, () => console.log('Listening'))
})()
