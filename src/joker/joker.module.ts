import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JokerResolver } from './joker.resolver';
import { JokerService } from './joker.service';

@Module({
  imports: [HttpModule],
  providers: [JokerResolver, JokerService],
})
export class JokerModule {}
