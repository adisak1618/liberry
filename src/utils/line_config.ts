import { resolve } from "path"
import * as dotenv from "dotenv";
// const path = process.env.NODE_ENV === 'production' ? "./../.env" : "./../.env";
dotenv.config({ path: resolve(__dirname, "../../.env") })
interface MiddlewareConfig {
  channelAccessToken: string;
  channelSecret: string;
}

export const config: MiddlewareConfig = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret,
};
