import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JokerResolver } from './joker.resolver';
import { JokerService } from './joker.service';
import { FavoriteJoke, Joke } from './joker.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([ FavoriteJoke ])],
  providers: [JokerResolver, JokerService],
})
export class JokerModule {}
