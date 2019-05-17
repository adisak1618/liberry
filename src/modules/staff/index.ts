import { ResolverMap } from "../../types/graphql-utils";
import { Staff, StaffRole } from "../../entity/Staff";
import { Resolver, Query, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import * as jwt from "jsonwebtoken";
import { Invite } from "../../entity/Invite";
import { TokenPayload } from "./../types/tokenPayload";
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

  @Authorized()
  @Query(() => TokenPayload, { nullable: true })
  getProfile(
    @Ctx() ctx: any
  ): any {
    try {
      const auth = ctx.req.headers.authorization;
      const { name, picture, sub, exp } = <any>jwt.verify(auth.split("Bearer ")[1], process.env.LoginchannelSecret, {
        issuer: 'https://access.line.me',
        audience: process.env.LoginchannelID,
        algorithms: ['HS256']
      })
      return { name, picture, lineid: sub, exp };
    } catch (error) {
      throw Error('wtf');
    }
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