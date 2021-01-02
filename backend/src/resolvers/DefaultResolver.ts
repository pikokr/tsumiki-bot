import { Arg, Mutation, Query, Resolver } from 'type-graphql'

@Resolver()
export class DefaultResolver {
  @Mutation(() => String, { nullable: true })
  async login(@Arg('code') code: string) {
    console.log(code)
  }

  @Query(() => String)
  async asdf() {
    return ''
  }
}
