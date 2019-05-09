import { User } from "../entity/User";
import { WebhookEvent, ReplyableEvent, LeaveEvent, UnfollowEvent } from "@line/bot-sdk";
import { Action } from "../entity/Action";
import { LineUser } from "../entity/LineUser";

const { client, replyMessage } = require('../helper');
const { uploadFromUrl } = require('../helper/upload');
const { studentTemplate } = require('./messageTemplate');
// const models = require('../models');
// const { Op } = require('sequelize');
const profileMsg = [{
  type: 'text',
  text: 'รูปโปรไฟด์นักเรียน? (อัพโหลดรูปรอนิดนึงเนาะ)',
  quickReply: {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "camera",
          "label": "ถ่ายรูป",
        }
      },
      {
        "type": "action",
        "action": {
          "type": "cameraRoll",
          "label": "เลือกจากคลังภาพ",
        }
      },
      {
        "type": "action",
        "action": {
          "type": "postback",
          "label": "ข้าม",
          "data": "cancle",
          "displayText": "ยังไม่เพิ่ม"
        }
      }
    ]
  }
}];

const validateClass = (value) => {
  const splitValue = value.split('/');
  if (splitValue.length !== 2) {
    return Error('ข้อความไม่ตรงกับรูปแบบ');
  }
  const firstNum = Number(splitValue[0])
  if (firstNum < 0 || firstNum > 6) {
    return Error('ใส่ชั้นได้แค่ 1 - 6 เท่านั้นครับ');
  }
  if (isNaN(splitValue[1])) {
    return Error('ห้องต้องเป็นตัวเลขเท่านั้น');
  }
  return true;
}

const handler = {
  user_code: {
    message: () => [{ type: 'text', text: 'รหัสนักเรียน?' }],
    func: async (event: WebhookEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        const msg = event.message.text.trim();
        const user = User.findOne({
          where: {
            userCode: msg,
          }
        })
        if (user) {
          throw Error('ลงทะเบียนรหัสนักเรียนอันนี้ไปแล้ว!');
        }
        return { user_code: msg }
      }
    }
  },
  fullname: {
    message: () => [{ type: 'text', text: 'ชื่อและนามสกุล?' }],
    func: async (event: WebhookEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text') {
        return { fullname: event.message.text.trim() }
      }
    }
  },
  user_class: {
    message: () => [{ type: 'text', text: 'ชั้นเรียน? (โปรดใส่ในรูปแบบนี้เช่น 6/1, 4/3)' }],
    func: async (event: WebhookEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text') {
        const msg = event.message.text.trim();
        const result = validateClass(msg)
        if (result instanceof Error) {
          // something wrong
          throw result;
        }
        return { user_class: `ม${event.message.text.trim()}` }
      }
    }
  },
  age: {
    message: () => [{ type: 'text', text: 'อายุ?' }],
    func: (event: WebhookEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        return { age: event.message.text.trim() }
      }
    }
  },
  tel: {
    message: () => [{ type: 'text', text: 'เบอร์โทรศัพท์?' }],
    func: (event: WebhookEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        return { tel: event.message.text.trim() }
      }
      throw Error('โปรดใส่เบอร์โทรศัพท์เป็นตัวเลข!');
    }
  },
  profile_picture: {
    message: () => profileMsg,
    func: async (event: WebhookEvent, action: Action, user: LineUser) => {
      if (event.type === 'message' && event.message.type === 'image' && event.message.contentProvider.type === 'line') {
        const name = action.data.user_code || 'unknow';
        const uploadImage = await uploadFromUrl(`https://api.line.me/v2/bot/message/${event.message.id}/content`, `studentprofile/${name.replace('/', '')}-${(new Date()).getTime()}`, { Authorization: `Bearer ${process.env.channelAccessToken}` });
        const pushMsg = client.pushMessage(user.lineid, { type: 'text', text: 'รอนิดนึงนะกำลังอัพโหลด....' });
        const [data] = await Promise.all([uploadImage, pushMsg]);
        return { profile_picture: data.key };
      } else if (event.type === 'postback' && event.postback.data === 'cancle') {
        return { profile_picture: null };
      }
    }
  }
};

const init = async (action: Action, event: WebhookEvent & ReplyableEvent, user: LineUser) => {
  const actionData = action.data || {};
  const requireDataList = ['user_code', 'fullname', 'user_class', 'age', 'tel', 'profile_picture'];
  const RemainingJob = requireDataList.filter(item => !(item in actionData));
  try {
    if (!event) {
      return handler[RemainingJob[0]].message(); // first time init return first remaining job message
    } else if (RemainingJob.length > 1) {
      const result = await handler[RemainingJob[0]].func(event, action, user);
      if (result) {
        action.data = { ...actionData, ...result };
        action.save();
        const nextMsg = handler[RemainingJob[1]].message();
        return replyMessage(event.replyToken, [...nextMsg]);
      } else {
        const msg = handler[RemainingJob[0]].message();
        return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้องโปรดลองใหม่!!!' }, ...msg]);
      }
    } else {
      const result = await handler[RemainingJob[0]].func(event, action, user);
      if (result) {
        action.data = { ...actionData, ...result };
        action.success = true;
        action.save();
        const newStuent = await User.create(action.data)
        // const newStuent = await models.user.create(action.data);
        const { profilePicture, fullname, userCode, tel, userClass, id } = newStuent;
        const studentCardMsg = studentTemplate({ profile_picture: `https://s3-ap-southeast-1.amazonaws.com/tcliberry/${profilePicture}`, fullname, userCode, tel, userClass, id });
        return replyMessage(event.replyToken, [{ type: 'text', text: 'ดีใจด้วย ลงทะเบียนนักเรียนเสร็จแล้ว' }, studentCardMsg]);
      } else {
        const msg = handler[RemainingJob[0]].message();
        return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้องโปรดลองใหม่!!!' }, ...msg]);
      }
    }
  } catch (error) {
    const msg = handler[RemainingJob[0]].message();
    return replyMessage(event.replyToken, [{ type: 'text', text: error.message }, ...msg]);
  }
};

export const registerUser = async (event: WebhookEvent & ReplyableEvent, action: Action, user: LineUser) => {
  try {
    if (action) {
      init(action, event, user);
    } else {
      const newAction = await Action.create({
        job: 'registerUser',
        success: false,
        lineUser: user,
      });
      const initMessage = await init(newAction, null, null); // first remaining job message
      return replyMessage(event.replyToken, [{ type: 'text', text: 'เริ่มลงทะเบียนนักเรียนกันเลย!!!' }, ...initMessage]);
    }
  } catch (e) {
    return replyMessage(event.replyToken, [{ type: 'text', text: 'บางอย่างเกิดผิดพลาด' }]);
  }
}