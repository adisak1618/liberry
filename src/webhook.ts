import {
  WebhookEvent,
  TextMessage
} from '@line/bot-sdk';
import { replyMessage, parseQueryString, client } from "./helper";
import * as handler from "./handler";
import { uploadFromUrl } from "./helper/upload";
import { createRichMenu } from "./helper/createRichMenu";
import { LineUser } from './entity/LineUser';
import { Action } from './entity/Action';
import { createQueryBuilder, getConnection, getManager } from 'typeorm';

export default async (event: WebhookEvent): Promise<any> => {
  console.log('event', event);
  let user = await getManager()
    .createQueryBuilder(LineUser, "lineuser")
    .leftJoinAndSelect("lineuser.actions", "action", "action.success = :isSuccess", { isSuccess: false })
    .getOne();
  if (!user) {
    const newLineUser = new LineUser();
    newLineUser.lineid = event.source.userId;
    newLineUser.path = "";
    newLineUser.follow = true;
    user = await newLineUser.save()
    await client.linkRichMenuToUser(event.source.userId, 'richmenu-50c085d05b629654dcd50ace8bf32d20');
  }
  if (event.type === 'follow') {
    const msg: TextMessage = { type: 'text', text: 'สวัสดี :)' };
    return replyMessage(event.replyToken, msg);
  } else {
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
}