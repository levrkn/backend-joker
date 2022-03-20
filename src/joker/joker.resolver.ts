import { Args, Query, Resolver } from '@nestjs/graphql';
import { FetchJokesType } from 'src/utils/types';
import { JokerService } from './joker.service';
import { Joker, Jokes } from './joker.model';

@Resolver(() => [Joker, Jokes])
export class JokerResolver {
  constructor(private readonly JokerService: JokerService) {}

  @Query(() => Joker, { name: 'randomJoke' })
  async randomJoke(
    @Args({ name: 'category', nullable: true }) category?: string,
  ): FetchJokesType {
    return this.JokerService.getRandomJoke(category);
  }

  @Query(() => Jokes, { name: 'searchJoke', nullable: true })
  async searchJoke(@Args('query') query: string): FetchJokesType {
    return this.JokerService.getJokeBySearch(query);
  }
}
