import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { Invite } from "../../entity/Invite";

export const resolvers: ResolverMap = {
  Query: {
    findInvites: async () => {
      const data = await Invite.find({
        where: {
          success: false
        }
      });
      return data;
    }
  },
  Mutation: {
    createInvite: async (_, args) => {
      const invite = Invite.create({ ...args, code: bcrypt.genSaltSync(10), success: false })
      await invite.save()
      return invite;
    }
  }
};