import { getConnectionOptions, createConnection } from "typeorm";
import { Action } from "../entity/Action";
import { Book } from "../entity/Book";
import { Category } from "../entity/Category";
import { LineUser } from "../entity/LineUser";
import { Transection } from "../entity/Transection";
import { User } from "../entity/User";
import { Writer } from "../entity/Writer";
import { Staff } from "../entity/Staff";
import { Invite } from "../entity/Invite";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV === 'production' ? 'production' : 'default');
  console.log('connectionOptions', connectionOptions);
  return process.env.NODE_ENV === "production"
    ? createConnection({
      ...connectionOptions,
      url: process.env.DATABASE_URL,
      entities: [Action, Book, Category, LineUser, Transection, User, Writer, Staff, Invite],
      name: "default"
    } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
