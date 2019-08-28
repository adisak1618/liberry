import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { Category } from "../../entity/Category";
import { ObjectType, Field } from "type-graphql";
import { createQueryBuilder } from 'typeorm';

@ObjectType()
class Level1Category extends Category {
  @Field(type => [Category], { nullable: true })
  children: Category[]
}

@ObjectType()
class Level2Category extends Category {
  @Field(type => [Level1Category], { nullable: true })
  children: Level1Category[]
}

@ObjectType()
class Level3Category extends Category {
  @Field(type => [Level2Category], { nullable: true })
  children: Level2Category[]
}

@Resolver()
export class CategoryResolver {

  @Query(() => Level3Category, { nullable: true })
  async findCategories() {
    // const manager = getManager()
    const categories = await createQueryBuilder(Category, 'category')
      .leftJoinAndSelect("category.children", "level1")
      .leftJoinAndSelect("level1.children", "level2")
      .leftJoinAndSelect("level2.children", "level3")
      .where('category."parentId" IS NULL')
      .getOne()
    return categories;
  }
}