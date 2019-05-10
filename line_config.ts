import { resolve } from "path"
import * as dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "./.env") })
interface MiddlewareConfig {
  channelAccessToken: string;
  channelSecret: string;
}

export const config: MiddlewareConfig = {
  channelAccessToken: 'process.env.channelAccessToken',
  channelSecret: 'process.env.channelSecret',
};
