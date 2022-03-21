import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { jokesUrl } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { Joke } from './joker.model';

@Injectable()
export class JokerService {
  constructor(
    @InjectRepository(Joke)
    private readonly JokesRepository: Repository<Joke>,
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

  async addFavoriteJoke(id: string): Promise<Joke[]> {
    const joke = await this.JokesRepository.save(
      this.JokesRepository.create(
        (
          await lastValueFrom(this.httpService.get(`${jokesUrl}/${id}`))
        ).data,
      ),
    );
    this.JokesRepository.find().then((data) => console.log(data));
    return joke;
  }

  async getFavoriteJokes(): Promise<Joke[]> {
    return this.JokesRepository.find().then((data) => data)
  }
}
