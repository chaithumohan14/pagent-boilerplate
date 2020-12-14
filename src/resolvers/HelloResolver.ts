import { Query, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return "hai hello";
  }
}

export default HelloResolver;
