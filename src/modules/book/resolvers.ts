import { ResolverMap } from "../../types/graphql-utils";
import { Book } from "../../entity/Book";

export const resolvers: ResolverMap = {
  Query: {
    findBooks: async () => {
      return await Book.find();
    }
  }
};