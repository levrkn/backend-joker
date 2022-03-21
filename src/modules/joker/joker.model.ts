import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Joke {
  @Column()
  @Field()
  id: string;

  @Column()
  @Field()
  value: string;

  @Column('text', { array: true })
  @Field(() => [String])
  categories: string[];

  @Column()
  @Field()
  icon_url: string;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field()
  created_at: string;

  @Column()
  @Field()
  updated_at: string;
}

@Entity('favoriteJokes')
@ObjectType()
export class FavoriteJoke extends Joke {
  @PrimaryGeneratedColumn()
  @Field()
  ident: number;
}

@ObjectType()
export class Jokes {
  @Field()
  total: number;

  @Field(() => [Joke])
  result: Joke[];
}
