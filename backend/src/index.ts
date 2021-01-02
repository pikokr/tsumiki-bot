import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import dotenv from 'dotenv'
import { buildSchema } from 'type-graphql'
import { DefaultResolver } from './resolvers/DefaultResolver'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '../.env') })
;(async () => {
  const schema = await buildSchema({
    resolvers: [DefaultResolver],
  })
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      return { test: 123 }
    },
  })
  server.listen(process.env.BACKEND_PORT, () => console.log('Listening'))
})()
