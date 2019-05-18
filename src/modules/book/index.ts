import * as bcrypt from "bcryptjs";
// import { ResolverMap } from "../../types/graphql-utils";
import { Invite, StaffRole } from "../../entity/Invite";
import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { Book } from "../../entity/Book";
import { ObjectType, Field, ID } from "type-graphql";
import { Transection } from "../../entity/Transection";
import { getManager } from 'typeorm';

@ObjectType()
class bookStateValue {
  @Field()
  book: number

  @Field()
  success: number

  @Field()
  returnBook: number
  // @Field(() => [Book], { nullable: true })
  // books: Book[]
}

@Resolver()
export class BookResolver {
  @Query(() => bookStateValue, { nullable: true })
  async bookState(): Promise<bookStateValue> {
    const book = await Book.count();
    const transection = await getManager()
      .createQueryBuilder(Transection, 'transection')
      .select("sum(case when transection.return = false then 1 end) as return, sum(case when transection.return = true then 1 end) as success")
      .execute()
    return {
      book,
      success: transection[0].success,
      returnBook: transection[0].return
    };
  }
}