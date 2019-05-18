import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class TokenPayload {
  @Field(type => ID)
  lineid: string;

  @Field()
  picture: string;

  @Field()
  name: string;

  @Field()
  exp: string;
}
