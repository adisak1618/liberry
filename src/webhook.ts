import {
  WebhookEvent,
  TextMessage,
} from '@line/bot-sdk';
import { getRepository } from "typeorm";
import { replyMessage, parseQueryString, client } from "./helper";
import { uploadFromUrl } from "./helper/upload";
import { createRichMenu } from "./helper/createRichMenu";
import { LineUser } from './entity/LineUser';
import { EventEmitter } from 'events';
// import * as handler from "./handler";

export default async (event: WebhookEvent): Promise<any> => {
  console.log('event', event);
  // const msg: TextMessage = { type: "text", text: 'hello world!' };
  // return client.replyMessage(event["replyToken"], msg);
  const user = await getRepository(LineUser).findOne({
    where: {
      lineid: event.source.userId
    }
  })
  console.log('user', user);
  const newLineUser = new LineUser();
  newLineUser.lineid = event.source.userId;
  newLineUser.path = "";
  newLineUser.follow = true;
  await newLineUser.save()
  // const [user, created] = await models.line_user.findOrCreate({
  //   where: {
  //     lineid: event.source.userId,
  //   },
  //   // include: {
  //   //   model: models.user,
  //   //   as: 'user',
  //   // },
  //   defaults: {
  //     lineid: event.source.userId,
  //   }
  // });
  // if (created) {
  //   await client.linkRichMenuToUser(event.source.userId, 'richmenu-50c085d05b629654dcd50ace8bf32d20');
  // }
  if (event.type === 'follow') {
    // const msg = [{ type: 'text', text: 'สวัสดี :)' }];
    // return replyMessage(event.replyToken, msg);
  } else {
    // const action = await models.action.findAndCountAll({
    //   where: {
    //     success: false,
    //   },
    //   // raw: true,
    // })
    // if (event.type === 'postback') {
    //   const { name, query } = parseQueryString(event.postback.data)
    //   if (name in handler && action.count > 0) {
    //     const actionToCancle = action.rows[0];
    //     actionToCancle.success = true;
    //     actionToCancle.save();
    //     return handler[name](event, null, user, query);
    //   }

    //   // new action
    //   if (name in handler) {
    //     return handler[name](event, null, user, query);
    //   }
    // }
    // if (action.count > 0) { // have action to do
    //   const actionData = action.rows[0];
    //   return handler[actionData.job](event, actionData, user)
    // }
    // console.log('else')
    // await client.linkRichMenuToUser(event.source.userId, 'richmenu-50c085d05b629654dcd50ace8bf32d20');
  };
}