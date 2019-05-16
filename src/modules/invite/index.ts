import * as bcrypt from "bcryptjs";
// import { ResolverMap } from "../../types/graphql-utils";
import { Invite, StaffRole } from "../../entity/Invite";
import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";

// export const resolvers: ResolverMap = {
//   Query: {
//     findInvites: async () => {
//       const data = await Invite.find({
//         where: {
//           success: false
//         }
//       });
//       return data;
//     }
//   },
//   Mutation: {
//     createInvite: async (_, args) => {
//       const invite = Invite.create({ ...args, code: bcrypt.genSaltSync(10), success: false })
//       await invite.save()
//       return invite;
//     }
//   }
// };
@Resolver()
export class InviteResolver {
  @Authorized()
  @Query(() => [Invite], { nullable: true })
  async findInvites(): Promise<Invite[] | undefined> {
    return Invite.find({
      where: {
        success: false
      }
    });
  }

  @Authorized()
  @Mutation(() => Invite)
  async createInvite(
    @Arg("name") name: string,
    @Arg("role") role: StaffRole
  ) {
    const invite = Invite.create({ name, role, code: bcrypt.genSaltSync(10), success: 'false' })
    await invite.save()
    return invite;
  }
}