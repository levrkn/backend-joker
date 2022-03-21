import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FetchJokesType, JokeType } from 'src/utils/types';
import { JokerService } from './joker.service';
import { Joke, Jokes } from './joker.model';

@Resolver(() => [Joke, Jokes])
export class JokerResolver {
  constructor(private readonly JokerService: JokerService) {}

  @Query(() => Joke, { name: 'randomJoke' })
  async randomJoke(
    @Args({ name: 'category', nullable: true }) category?: string,
  ): Promise<Joke> {
    return this.JokerService.getRandomJoke(category);
  }

  @Query(() => Jokes, { name: 'searchJoke' })
  async searchJoke(
    @Args('query') query: string,
  ): Promise<{ total: number; result: Joke[] }> {
    return this.JokerService.getJokeBySearch(query);
  }

  @Query(() => [Joke], { name: 'favoriteJokes' })
  async favoriteJokes(): Promise<Joke[]> {
    return this.JokerService.getFavoriteJokes();
  }

  @Mutation(() => Joke, { name: 'addFavoriteJoke' })
  async addFavoriteJoke(@Args('id') id: string): Promise<Joke[]> {
    return this.JokerService.addFavoriteJoke(id);
  }
}
