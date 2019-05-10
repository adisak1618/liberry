const { client, replyMessage } = require('../helper');
import { borrowconfirmTemplate } from "./messageTemplate";
import { WebhookEvent, ReplyableEvent } from "@line/bot-sdk";
import { Action } from "../entity/Action";
import { User } from "../entity/User";
import { Book } from "../entity/Book";
import { LineUser } from "../entity/LineUser";
import { getConnection } from "typeorm";
import { Transection } from "../entity/Transection";

const handler = {
  user: {
    message: () => [{ type: 'text', text: 'รหัสนักเรียนที่จะยืมหนังสือ?' }],
    func: async (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        const msg = event.message.text.trim();
        const user = await User.findOne({
          where: {
            userCode: msg
          }
        });
        if (user) {
          return { user: user.id }
        }
        const notfoundMsg = {
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
                  "text": "ไม่พบรหัสนักเรียนนี้",
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
                  "text": "ลงทะเบียนนักเรียนใหม่",
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
                    "type": "postback",
                    "label": "ลงทะเบียนนักเรียน",
                    "displayText": "ลงทะเบียนนักเรียน",
                    "data": "registerUser"
                  },
                  "style": "primary"
                }
              ]
            }
          }
        };
        return replyMessage(event.replyToken, [notfoundMsg, { type: 'text', text: 'หรือลองพิมพ์รหัสนักเรียนอื่น' }]);
      }
    }
  },
  book: {
    message: () => [{ type: 'text', text: 'isbn ของหนังสือที่จะยืม?' }],
    func: async (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        const msg = event.message.text.trim();
        const book = await Book.findOne({
          where: {
            isbnCode: msg
          }
        });
        if (book) {
          return { book: book.id };
        }
        replyMessage(event.replyToken, [
          {
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
                    "text": "ไม่พบหนังสือเล่มนี้!",
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
                    "text": "หนังสือเล่มนี้ยังไม่ได้ลงทะเบียน คุณต้องการลงทะเบียนเลยมั๊ย?",
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
                      "type": "postback",
                      "label": "เพิ่มเลย",
                      "displayText": "ตกลง",
                      "data": `addBook?isbn_code=${msg}`,
                    },
                    "style": "primary"
                  }
                ]
              }
            }
          },
          { type: 'text', text: 'หรือลองใส่ isbn ของหนังสือใหม่' }
        ]);
      }
    }
  },
  validate: {
    message: async (action: Action) => {
      const { fullname, userCode } = await User.findOne({
        where: {
          id: action.data.user,
        }
      });
      const { cover, name: bookname } = await Book.findOne({
        where: {
          id: action.data.book,
        }
      });
      const msg = borrowconfirmTemplate({ cover: `https://s3-ap-southeast-1.amazonaws.com/tcliberry/${cover}`, fullname, userCode, bookname });
      return [msg];
    },
    func: async (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'postback' && event.postback.data === 'yes') {
        const borrowUser = await User.findOne({
          where: {
            id: action.data.user,
          }
        });
        const borrowBook = await Book.findOne({
          where: {
            id: action.data.book,
          }
        });
        if (borrowBook.count <= 0) {
          action.success = true;
          action.save();
          await replyMessage(event.replyToken, [
            { type: 'text', text: 'จำนวนหนังสือไม่พอ' }
          ]);
          throw Error('');
        }
        if (borrowBook && borrowUser) {
          return { validate: true };
        }
      } else {
        action.success = true;
        action.save();
        replyMessage(event.replyToken, [
          { type: 'text', text: 'ยกเลิกแล้ว' }
        ]);
      }
    }
  }
};

const init = async (action: Action, event: WebhookEvent & ReplyableEvent, user: LineUser) => {
  const actionData = action.data || {};
  const requireDataList = ['user', 'book', 'validate'];
  const RemainingJob = requireDataList.filter(item => !(item in actionData));
  try {
    if (!event) {
      return handler[RemainingJob[0]].message(action); // first time init return first remaining job message
    } else if (RemainingJob.length > 1) {
      const result = await handler[RemainingJob[0]].func(event, action, user);
      if (result) {
        action.data = { ...actionData, ...result };
        action.save();
        const nextMsg = await handler[RemainingJob[1]].message(action);
        return replyMessage(event.replyToken, [...nextMsg]);
      }
      // else {
      //   const msg = await handler[RemainingJob[0]].message(action);
      //   return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้องโปรดลองใหม่!!!' }, ...msg]);
      // }
    } else {
      const result = await handler[RemainingJob[0]].func(event, action, user);
      if (result) {
        action.data = { ...actionData, ...result };
        action.success = true;
        action.save();
        // await models.book.findOne({
        //   where: {
        //     id: action.data.book_id,
        //   }
        // });
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          await queryRunner.manager.createQueryBuilder()
            .update(Book)
            .set({
              count: () => "count - 1"
            })
            .where("id = :id", { id: action.data.book })
            .execute();
          const newTransection = Transection.create({ ...action.data, return: false });
          await queryRunner.manager.save(newTransection);
          replyMessage(event.replyToken, [{ type: 'text', text: 'ยืมหนังสือสำเร็จแล้ว' }]);
          await queryRunner.commitTransaction();
        } catch (error) {
          replyMessage(event.replyToken, [{ type: 'text', text: 'โปรดลองใหม่ บางอย่างผิดพลาดด' }]);
          await queryRunner.rollbackTransaction();
        } finally {
          await queryRunner.release();
        }
      }
      // else {
      //   const msg = handler[RemainingJob[0]].message();
      //   return replyMessage(event.replyToken, [{ type: 'text', text: 'ข้อมูลไม่ถูกต้องโปรดลองใหม่!!!' }, ...msg]);
      // }
    }
  } catch (error) {
    if (error.message !== "") {
      const msg = await handler[RemainingJob[0]].message(action);
      return replyMessage(event.replyToken, [{ type: 'text', text: error.message }, ...msg]);
    }
  }
};

export const borrowBook = async (event: WebhookEvent & ReplyableEvent, action: Action, user: LineUser, query: any) => {
  try {
    if (action) {
      init(action, event, user);
    } else {
      const newAction = Action.create({
        job: 'borrowBook',
        success: false,
        lineUser: user,
        data: query
      })
      await newAction.save()
      const initMessage = await init(newAction, null, null); // first remaining job message
      return replyMessage(event.replyToken, [{ type: 'text', text: 'มายืมหนังสือกันเลย!!!' }, ...initMessage]);
    }
  } catch (e) {
    return replyMessage(event.replyToken, [{ type: 'text', text: 'บางอย่างเกิดผิดพลาด' }]);
  }
}