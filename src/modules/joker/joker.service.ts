import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { jokesUrl } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { FavoriteJoke, Joke } from './joker.model';

@Injectable()
export class JokerService {
  constructor(
    @InjectRepository(FavoriteJoke)
    private readonly JokesRepository: Repository<FavoriteJoke>,
    private httpService: HttpService,
  ) {}

  async getRandomJoke(category: string): Promise<Joke> {
    return (
      await lastValueFrom(
        this.httpService.get(
          `${jokesUrl}/random${category ? `?category=${category}` : ''}`,
        ),
      )
    ).data;
  }

  async getJokeBySearch(
    query: string,
  ): Promise<{ total: number; result: Joke[] }> {
    return (
      await lastValueFrom(
        this.httpService.get(`${jokesUrl}/search?query=${query}`),
      )
    ).data;
  }

  async addFavoriteJoke(id: string): Promise<FavoriteJoke[]> {
    const joke = await this.JokesRepository.save(
      this.JokesRepository.create(
        (
          await lastValueFrom(this.httpService.get(`${jokesUrl}/${id}`))
        ).data,
      ),
    );
    return joke;
  }

  async getFavoriteJokes(): Promise<FavoriteJoke[]> {
    return this.JokesRepository.find().then((data) => data);
  }
}
