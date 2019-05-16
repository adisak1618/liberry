import { ResolverMap } from "../../types/graphql-utils";
import { Staff, StaffRole } from "../../entity/Staff";
import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { Invite } from "../../entity/Invite";
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
  @Authorized()
  @Query(() => [Staff], { nullable: true })
  async findStaffs(): Promise<Staff[] | undefined> {
    return Staff.find({
      where: {
        success: false
      }
    });
  }

  @Mutation(() => Staff, { nullable: true })
  async createStaff(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("lineid") lineid: string,
    @Arg("profile_url") profile_url: string,
  ): Promise<Staff | null> {
    const invite = await Invite.findOne({
      where: {
        code: code,
        success: false
      }
    })
    if (invite) {
      const newStaff = Staff.create({
        name, lineid, profile_url, role: invite.role
      });
      invite.success = "true";
      invite.save()
      newStaff.save()
      return newStaff
    }
    return null;
  }
}