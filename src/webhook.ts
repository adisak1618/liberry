import {
  WebhookEvent,
  TextMessage,
  ReplyableEvent
} from '@line/bot-sdk';
import { replyMessage, parseQueryString, client } from "./helper";
import * as handler from "./handler";
import { uploadFromUrl } from "./helper/upload";
import { createRichMenu } from "./helper/createRichMenu";
import { LineUser } from './entity/LineUser';
import { getManager } from 'typeorm';
import { Staff } from './entity/Staff';

const findUser = async (lineid: string) => {
  return await getManager()
    .createQueryBuilder(LineUser, "lineuser")
    .where("lineuser.lineid = :lineuser", { lineuser: lineid })
    .leftJoinAndSelect("lineuser.actions", "action", "action.success = :isSuccess", { isSuccess: false })
    .getOne();
}


const checkAdmin = async (event: ReplyableEvent) => {
  return await Staff.findOne({
    lineid: event.source.userId
  })
}

export default async (event: WebhookEvent): Promise<any> => {
  console.log('event', event);
  try {
    let user = await findUser(event.source.userId);
    const admin = await checkAdmin(event as any);
    if (!admin) {
      const msg: TextMessage = { type: 'text', text: 'คุณยังไม่มีสิทธิ์ใช้งานระบบนี้ โปรดติดต่อทีมงาน' };
      return replyMessage((event as any).replyToken, msg);
    }
    console.log('admin', admin)
    if (!user) {
      const newLineUser = new LineUser();
      newLineUser.lineid = event.source.userId;
      newLineUser.path = "";
      newLineUser.follow = true;
      await newLineUser.save()
      user = await findUser(event.source.userId);
      await client.linkRichMenuToUser(event.source.userId, 'richmenu-5bc418ec51d112bb230c38b6238fc0f2');
    }
    if (event.type === 'follow') {
      const msg: TextMessage = { type: 'text', text: 'สวัสดี :)' };
      // await client.linkRichMenuToUser(event.source.userId, 'richmenu-50c085d05b629654dcd50ace8bf32d20');
      return replyMessage(event.replyToken, msg);
    } else {
      // console.log('user', user);
      const { actions } = user;
      if (event.type === 'postback') {
        const { name, query } = parseQueryString(event.postback.data)
        if (name in handler && actions.length > 0) {
          const actionToCancle = actions[0];
          actionToCancle.success = true;
          actionToCancle.save();
          return handler[name](event, null, user, query);
        }

        // new action
        if (name in handler) {
          return handler[name](event, null, user, query);
        }
      }
      if (actions.length > 0) { // have action to do
        const actionData = actions[0];
        return handler[actionData.job](event, actionData, user)
      }

      // else
      // await client.linkRichMenuToUser(event.source.userId, 'richmenu-50c085d05b629654dcd50ace8bf32d20');
    };
  } catch (error) {
    const msg: TextMessage = { type: 'text', text: 'สวัสดี :)' };
    return replyMessage((event as any).replyToken, msg);
  }
  // await createRichMenu();
}