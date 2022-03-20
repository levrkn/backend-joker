import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { jokesUrl } from 'src/utils/constants';
import { FetchJokesType } from 'src/utils/types';

@Injectable()
export class JokerService {
  constructor(private httpService: HttpService) {}

  async getRandomJoke(category?: string): FetchJokesType {
    return (
      await lastValueFrom(
        this.httpService.get(
          `${jokesUrl}/random${category ? `?category=${category}` : ''}`,
        ),
      )
    ).data;
  }

  async getJokeBySearch(query?: string): FetchJokesType {
    return (
      await lastValueFrom(
        this.httpService.get(`${jokesUrl}/search${query && `?query=${query}`}`),
      )
    ).data;
  }
}
