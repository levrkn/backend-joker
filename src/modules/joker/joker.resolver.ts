import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JokerService } from './joker.service';
import { FavoriteJoke, Joke, Jokes } from './joker.model';

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

  @Query(() => [FavoriteJoke], { name: 'favoriteJokes' })
  async favoriteJokes(): Promise<FavoriteJoke[]> {
    return this.JokerService.getFavoriteJokes();
  }

  @Mutation(() => FavoriteJoke, { name: 'addFavoriteJoke' })
  async addFavoriteJoke(@Args('id') id: string): Promise<FavoriteJoke[]> {
    return this.JokerService.addFavoriteJoke(id);
  }
}
