import { resolve } from "path"
import * as dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "./.env") })
interface MiddlewareConfig {
  channelAccessToken: string;
  channelSecret: string;
}

export const config: MiddlewareConfig = {
  channelAccessToken: 'tB2mujO+cikLjHk0S5T9MGhejr7ROJjmnK5hBkRSS3/YJhYnvcQfqXyU3tcCtnJsuxCZhyNyi37ujYXrR6i0bc9aNYKAX70ioXiuVoJKudIlCees9bhaT3uvDKejrcqx7IlMH3GcxnGKgN/iw9heDAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '919828f67871ce22a0ed3bd53abe2390',
};
