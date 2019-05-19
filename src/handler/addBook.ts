const { client, replyMessage } = require('../helper');
import { uploadFromUrl } from "../helper/upload";
import { BookTemplate } from "./messageTemplate";
import { getManager, getConnection } from "typeorm";
import { Writer } from "../entity/Writer";
import { WebhookEvent, ReplyableEvent } from "@line/bot-sdk";
import { Action } from "../entity/Action";
import { LineUser } from "../entity/LineUser";
import { Book } from "../entity/Book";
const categoryLiffAppMsg = [{
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "หมวดหมู่ของหนังสือ",
          "size": "xl",
          "align": "center",
          "weight": "bold"
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "กรุณา เลือกหมวดหมู่ที่เหมาะสมให้กับหนังสือเล่มนี้",
          "align": "center",
          "wrap": true
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "กดเพื่อเลือก",
            "uri": "line://app/1573406906-RkbAeGd9"
          },
          "style": "primary"
        }
      ]
    }
  }
}];
const coverMsg = [{
  type: 'text',
  text: 'รูปหน้าปก? (อัพโหลดรูปรอนิดนึงเนาะ)',
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

const handler = {
  name: {
    message: () => [{ type: 'text', text: 'ชื่อหนังสือคือ?' }],
    func: (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text') {
        return { name: event.message.text.trim().toLowerCase() }
      }
    }
  },
  writer: {
    message: () => [{ type: 'text', text: 'ชื่อผู้เขียนคือ?' }],
    func: async (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text') {
        const msg = event.message.text.trim().toLowerCase();
        let writer = await getManager()
          .createQueryBuilder(Writer, "lineuser")
          .where({
            name: msg
          })
          .getOne();
        if (!writer) {
          const newWriter = Writer.create({
            name: msg
          });
          writer = await newWriter.save()
        }

        // const [writer, created] = await models.writer.findOrCreate({
        //   where: {
        //     name: msg,
        //   },
        //   defaults: {
        //     name: msg,
        //   }
        // });
        return { writer: writer.id }
      }
    }
  },
  categoryAction: {
    message: () => categoryLiffAppMsg,
    func: () => ({ categoryAction: true })
  },
  page_count: {
    message: () => [{ type: 'text', text: 'จำนวนหน้า?' }],
    func: (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        return { page_count: event.message.text.trim() }
      }
    }
  },
  publisher: {
    message: () => [{ type: 'text', text: 'สำนักพิมพ์?' }],
    func: (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text') {
        return { publisher: event.message.text.trim().toLowerCase() }
      }
    }
  },
  price: {
    message: () => [{ type: 'text', text: 'ราคา?' }],
    func: (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        return { price: event.message.text.trim() }
      }
    }
  },
  isbnCode: {
    message: () => [{ type: 'text', text: 'isbn?' }],
    func: (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        return { isbnCode: event.message.text.trim() }
      }
    }
  },
  count: {
    message: () => [{
      type: 'text',
      text: 'เพิ่มกี่เล่ม?',
      quickReply: {
        "items": [
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "1",
              "text": "1",
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "2",
              "text": "2",
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "3",
              "text": "3",
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "4",
              "text": "4",
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "5",
              "text": "5",
            }
          }
        ]
      }
    }],
    func: (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        const count = event.message.text.trim();
        return { count, remain: count };
      }
    }
  },
  cover: {
    message: () => coverMsg,
    func: async (event: WebhookEvent & ReplyableEvent, action: Action, user: LineUser) => {
      if (event.type === 'message' && event.message.type === 'image' && event.message.contentProvider.type === 'line') {
        try {
          const name = action.data.name || 'unknow';
          // const uploadImage = uploadFromUrl(`https://api.line.me/v2/bot/message/${event.message.id}/content`, `bookcover/${name.replace('/', '')}-${(new Date()).getTime()}`, { Authorization: `Bearer ${process.env.channelAccessToken}` });
          const uploadImage = uploadFromUrl({
            url: `https://api.line.me/v2/bot/message/${event.message.id}/content`,
            name: `${name.replace('/', '')}-${(new Date()).getTime()}`,
            RequestHeaders: { Authorization: `Bearer ${process.env.channelAccessToken}` },
            folder: 'bookcover/'
          });
          const pushMsg = client.pushMessage(user.lineid, { type: 'text', text: 'รอนิดนึงนะกำลังอัพโหลด....' });
          const [data] = await Promise.all([uploadImage, pushMsg]);
          return { cover: data['key'] };
        } catch (error) {
          return replyMessage(event.replyToken, [{ type: 'text', text: 'อัพโหลดผิดพลาด!!! โปรดลองใหม่' }]);
        }
      } else if (event.type === 'postback' && event.postback.data === 'cancle') {
        return { cover: null };
      }
    }
  }
};

const init = async (action: Action, event: WebhookEvent & ReplyableEvent, user: LineUser) => {
  try {
    const requireDataList = ['name', 'writer', 'categoryAction', 'page_count', 'publisher', 'price', 'isbnCode', 'count', 'cover'];
    const actionData = action.data || {};
    const RemainingJob = requireDataList.filter(item => !(item in actionData));
    if (!event) {
      return handler[RemainingJob[0]].message(); // first time init return first remaining job message
    } else if (RemainingJob.length > 1) {
      if (handler[RemainingJob[0]].func) {
        const result = await handler[RemainingJob[0]].func(event, action, user);
        if (result) {
          action.data = { ...actionData, ...result };
          action.save();
        } else {
          const msg = handler[RemainingJob[0]].message();
          return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้องโปรดลองใหม่!!!' }, ...msg]);
        }
      }
      const nextMsg = handler[RemainingJob[1]].message();
      return replyMessage(event.replyToken, [...nextMsg]);
    } else {
      const result = await handler[RemainingJob[0]].func(event, action, user);
      if (result) {
        action.data = { ...actionData, ...result };
        action.success = true;
        action.save();
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const newBook = Book.create(action.data);
          await queryRunner.manager.save(newBook);
          const book = await queryRunner.manager.createQueryBuilder(Book, "book")
            .leftJoinAndSelect("book.category", "category")
            .leftJoinAndSelect("book.writer", "writer")
            .where("book.id = :bookId", { bookId: newBook.id })
            .getOne();

          const { cover, name, category, writer, page_count, publisher, count, id } = book;
          const newBookMsg = BookTemplate({
            cover: cover ? `https://s3-ap-southeast-1.amazonaws.com/tcliberry/${cover}` : `${process.env.APPBASEURL}/images/default-thumbnail.jpg`,
            name,
            category: category.name,
            writer: writer.name,
            page_count,
            publisher,
            count,
            bookid: id,
          })
          replyMessage(event.replyToken, [{ type: 'text', text: 'ดีใจด้วย หนังสือเล่มนี้พร้อมที่จะให้ยืมแล้ว!!!' }, newBookMsg]);
          await queryRunner.commitTransaction();
        } catch (error) {
          replyMessage(event.replyToken, [{ type: 'text', text: 'โปรดลองใหม่ บางอย่างผิดพลาดด' }]);
          await queryRunner.rollbackTransaction();
        } finally {
          await queryRunner.release();
        }
      } else {
        const msg = handler[RemainingJob[0]].message();
        return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้องโปรดลองใหม่!!!' }, ...msg]);
      }
    }
  } catch (error) {
    return replyMessage(event.replyToken, [{ type: 'text', text: 'บางอย่างเกิดผิดพลาด' }]);
  }
};

export const addBook = async (event: WebhookEvent & ReplyableEvent, action: Action, user: LineUser, query: any) => {
  try {
    if (action) {
      init(action, event, user);
    } else {
      const newAction = Action.create({
        job: 'addBook',
        success: false,
        lineUser: user,
        data: query
      })
      await newAction.save()
      // const newAction = await models.action.create({
      //   job: 'addBook',
      //   success: false,
      //   step: 0,
      //   line_user_id: user.id,
      //   data: query,
      // });
      const initMessage = await init(newAction, null, null); // first remaining job message
      return replyMessage(event.replyToken, [{ type: 'text', text: 'เริ่มลงทะเบียนหนังสือกันเลย!!!' }, ...initMessage]);
    }
  } catch (e) {
    return replyMessage(event.replyToken, [{ type: 'text', text: 'บางอย่างเกิดผิดพลาด' }]);
  }
}