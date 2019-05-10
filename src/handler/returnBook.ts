const { client, replyMessage } = require('../helper');
import { WebhookEvent, ReplyableEvent } from "@line/bot-sdk";
import { Action } from "../entity/Action";
import { User } from "../entity/User";
import { Book } from "../entity/Book";
import { Transection } from "../entity/Transection";
import { LineUser } from "../entity/LineUser";

import { returnBookConfirm } from "./messageTemplate";
import { getConnection } from "typeorm";

const handler = {
  user: {
    message: () => [{ type: 'text', text: 'รหัสนักเรียนที่จะคืนหนังสือ?' }],
    func: async (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        const msg = event.message.text.trim();
        const user = await User.findOne({
          where: {
            userCode: msg,
          }
        });
        if (user) {
          return { user: user.id }
        }
        return replyMessage(event.replyToken, [{ type: 'text', text: 'ไม่พบนักเรียนคนนี้ โปรดลองใหม่' }]);
      }
    }
  },
  book: {
    message: () => [{ type: 'text', text: 'isbn ของหนังสือที่จะคืน?' }],
    func: async (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'message' && event.message.type === 'text' && !isNaN(Number(event.message.text.trim()))) {
        const msg = event.message.text.trim();
        const book = await Book.findOne({
          where: {
            isbnCode: msg,
          }
        });
        if (book) {
          return { book: book.id };
        }
        replyMessage(event.replyToken, [
          { type: 'text', text: 'ไม่พบหนังสือเล่มนี้ โปรดลองใหม่' }
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
      const msg = returnBookConfirm({ cover: `https://s3-ap-southeast-1.amazonaws.com/tcliberry/${cover}`, fullname, userCode, bookname });
      return [msg];
    },
    func: async (event: WebhookEvent & ReplyableEvent, action: Action) => {
      if (event.type === 'postback' && event.postback.data === 'yes') {
        const BookTransaction = await Transection.findOne({
          where: {
            book: action.data.book,
            user: action.data.user,
            return: false,
          }
        });
        if (BookTransaction) {
          return { validate: true };
        } else {
          action.success = true;
          await action.save();
          replyMessage(event.replyToken, [
            { type: 'text', text: 'ไม่พบการยืมหนังสือเล่มนี้จากนักเรียนคนดังกล่าว' }
          ]);
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
          await queryRunner.manager.createQueryBuilder()
            .update(Transection)
            .set({
              return: true
            })
            .where("book = :bookId AND user = :userId", { bookId: action.data.book, userId: action.data.user })
            .execute();
          await queryRunner.manager.createQueryBuilder()
            .update(Book)
            .set({
              count: () => "count + 1"
            })
            .where("id = :id", { id: action.data.book })
            .execute();
          await queryRunner.commitTransaction();
        } catch (error) {
          await queryRunner.rollbackTransaction();
        } finally {
          await queryRunner.release();
        }
        return replyMessage(event.replyToken, [{ type: 'text', text: 'คืนหนังสือสำเร็จแล้ว' }]);
      }
    }
  } catch (error) {
    const msg = await handler[RemainingJob[0]].message(action);
    return replyMessage(event.replyToken, [{ type: 'text', text: error.message }, ...msg]);
  }
};

export const returnBook = async (event: WebhookEvent & ReplyableEvent, action: Action, user: LineUser, query: any) => {
  try {
    if (action) {
      init(action, event, user);
    } else {
      const newAction = Action.create({
        job: 'returnBook',
        success: false,
        lineUser: user,
        data: query
      })
      await newAction.save()
      const initMessage = await init(newAction, null, null); // first remaining job message
      return replyMessage(event.replyToken, [{ type: 'text', text: 'เริ่มคืนหนังสือ!!!' }, ...initMessage]);
    }
  } catch (e) {
    console.log('error', e);
    return replyMessage(event.replyToken, [{ type: 'text', text: 'บางอย่างเกิดผิดพลาด' }]);
  }
}