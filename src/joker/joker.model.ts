import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Joker {
  @Field()
  id: string;

  @Field()
  value: string;

  @Field(() => [String])
  categories: string[];

  @Field()
  icon_url: string;

  @Field()
  url: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}

@ObjectType()
export class Jokes {
  @Field()
  total: number;

  @Field(() => [Joker])
  result: Joker[];

}
