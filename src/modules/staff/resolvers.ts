import { ResolverMap } from "../../types/graphql-utils";
import { Staff } from "../../entity/Staff";

export const resolvers: ResolverMap = {
  Query: {
    findStaffs: async () => {
      const data = await Staff.find();
      return data;
    }
  }
};