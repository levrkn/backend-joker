import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export type JokeType = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

export type FetchJokesType = Promise<Observable<AxiosResponse<JokeType>>>;
