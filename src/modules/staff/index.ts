import { ResolverMap } from "../../types/graphql-utils";
import { Staff } from "../../entity/Staff";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
// export const resolvers: ResolverMap = {
//   Query: {
//     findStaffs: async () => {
//       const data = await Staff.find();
//       return data;
//     }
//   }
// };

@Resolver()
export class StaffResolver {
  @Query(() => [Staff], { nullable: true })
  async findStaffs(): Promise<Staff[] | undefined> {
    return Staff.find({
      where: {
        success: false
      }
    });
  }
}